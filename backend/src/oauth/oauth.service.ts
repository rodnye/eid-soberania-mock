import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
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
  private accessTokens: Map<string, { cid: string; expiresAt: Date }> =
    new Map();

  constructor() {}

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

  async exchangeAuthorizationCode(code: string) {
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

    this.authorizationCodes.delete(code);

    const accessToken = this.generateAccessToken(authCode);
    const refreshToken = this.generateRefreshToken();

    return {
      access_token: accessToken,
      token_type: 'Bearer',
      expires_in: 3600, // 1h
      refresh_token: refreshToken,
      scope: authCode.scope,
    };
  }

  private generateAccessToken(authCode: AuthorizationCode): string {
    const token = randomBytes(32).toString('hex');
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 1);
    this.accessTokens.set(token, { cid: authCode.cid, expiresAt });
    this.authorizationCodes.delete(authCode.code);

    return token;
  }

  private generateRefreshToken(): string {
    return randomBytes(32).toString('hex');
  }

  async verifyAuthorizationCode(code: string): Promise<boolean> {
    const authCode = this.authorizationCodes.get(code);

    if (!authCode) {
      return false;
    }

    if (authCode.expiresAt < new Date()) {
      this.authorizationCodes.delete(code);
      return false;
    }

    return true;
  }

  verifyAccessToken(token: string): string | null {
    const tokenData = this.accessTokens.get(token);
    if (!tokenData) {
      return null;
    }

    if (tokenData.expiresAt < new Date()) {
      this.accessTokens.delete(token);
      return null;
    }

    return tokenData.cid;
  }
}
