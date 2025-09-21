import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { OAuthService } from './oauth.service';
import { ClientsService } from '../clients/clients.service';
import { UsersService } from '../users/users.service';

@Controller('oauth')
export class OAuthController {
  constructor(
    private readonly oauthService: OAuthService,
    private readonly clientsService: ClientsService,
    private readonly usersService: UsersService,
  ) {}

  @Post('authorize')
  async authorize(
    @Body('clientId') clientId: string,
    @Body('redirectUri') redirectUri: string,
    @Body('scope') scope: string,
    @Body('state') state: string,
    @Body('cid') cid: string,
    @Body('password') password: string,
  ) {
    if (!clientId || !redirectUri || !cid || !password)
      throw new HttpException(
        'Missing required parameters',
        HttpStatus.BAD_REQUEST,
      );

    if (!this.clientsService.verifyClientId(clientId))
      throw new HttpException('Invalid client_id', HttpStatus.UNAUTHORIZED);

    if (!this.clientsService.verifyClientUrl(clientId, redirectUri))
      throw new HttpException('Invalid redirect_uri', HttpStatus.UNAUTHORIZED);

    if (!this.usersService.verifyPassword(cid, password)) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    const authCode = await this.oauthService.generateAuthorizationCode(
      clientId,
      redirectUri,
      scope,
      state,
      cid,
    );

    const redirectUrl = new URL(redirectUri);
    redirectUrl.searchParams.append('code', authCode);
    if (state) redirectUrl.searchParams.append('state', state);

    return {
      redirectUrl,
    };
  }

  @Post('verify-code')
  async validateCode(
    @Body('code') code: string,
    @Body('client_id') clientId: string,
  ) {
    if (!code || !clientId) {
      throw new HttpException(
        'Missing required parameters',
        HttpStatus.BAD_REQUEST,
      );
    }

    const isValid = await this.oauthService.verifyAuthorizationCode(
      code,
      clientId,
    );

    if (!isValid) {
      throw new HttpException(
        'Invalid authorization code',
        HttpStatus.UNAUTHORIZED,
      );
    }

    return { valid: true };
  }
}
