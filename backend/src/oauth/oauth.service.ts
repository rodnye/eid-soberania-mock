import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { randomBytes } from 'crypto';

interface AuthorizationCode {
  code: string;
  clientId: string;
  redirectUri: string;
  scope: string;
  state: string;
  expiresAt: Date;
  cid: string;
}

@Injectable()
export class OAuthService {
  private authorizationCodes: Map<string, AuthorizationCode> = new Map();

  constructor(private readonly usersService: UsersService) {}

  async generateAuthorizationCode(
    clientId: string,
    redirectUri: string,
    scope: string,
    state: string,
    cid: string,
  ): Promise<string> {
    const code = randomBytes(32).toString('hex');
    const expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + 10);

    this.authorizationCodes.set(code, {
      code,
      clientId,
      redirectUri,
      scope,
      state,
      expiresAt,
      cid,
    });

    return code;
  }

  async exchangeAuthorizationCode(
    code: string,
    clientId: string,
    redirectUri: string,
  ) {
    const authCode = this.authorizationCodes.get(code);

    if (!authCode) {
      throw new HttpException(
        'Invalid authorization code',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (authCode.expiresAt < new Date()) {
      this.authorizationCodes.delete(code);
      throw new HttpException(
        'Authorization code expired',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (
      authCode.clientId !== clientId ||
      authCode.redirectUri !== redirectUri
    ) {
      throw new HttpException(
        'Invalid client or redirect URI',
        HttpStatus.BAD_REQUEST,
      );
    }

    this.authorizationCodes.delete(code);

    const accessToken = this.generateAccessToken();
    const refreshToken = this.generateRefreshToken();

    return {
      access_token: accessToken,
      token_type: 'Bearer',
      expires_in: 3600, // 1h
      refresh_token: refreshToken,
      scope: authCode.scope,
    };
  }

  private generateAccessToken(): string {
    return randomBytes(32).toString('hex');
  }

  private generateRefreshToken(): string {
    return randomBytes(32).toString('hex');
  }

  async verifyAuthorizationCode(
    code: string,
    clientId: string,
  ): Promise<boolean> {
    const authCode = this.authorizationCodes.get(code);

    if (!authCode) {
      return false;
    }

    if (authCode.expiresAt < new Date()) {
      this.authorizationCodes.delete(code);
      return false;
    }

    return authCode.clientId === clientId;
  }
}
