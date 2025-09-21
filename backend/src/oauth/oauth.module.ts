import { Module } from '@nestjs/common';
import { OAuthController } from './oauth.controller';
import { OAuthService } from './oauth.service';
import { ClientsService } from '../clients/clients.service';
import { UsersService } from 'src/users/users.service';

@Module({
  controllers: [OAuthController],
  providers: [OAuthService, ClientsService, UsersService],
  exports: [OAuthService],
})
export class OAuthModule {}
