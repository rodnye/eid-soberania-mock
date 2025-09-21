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

@Controller('/api/oauth')
export class OAuthController {
  constructor(
    private readonly service: OAuthService,
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

    const authCode = await this.service.generateAuthorizationCode(
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

  @Post('exchange')
  async exchangeCode(@Body('code') code: string) {
    return await this.service.exchangeAuthorizationCode(code);
  }
}
