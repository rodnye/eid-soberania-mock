import { Module } from '@nestjs/common';
import { OAuthController } from './oauth.controller';
import { OAuthService } from './oauth.service';
import { UsersModule } from '../users/users.module';
import { ClientsService } from '../clients/clients.service';

@Module({
  imports: [UsersModule],
  controllers: [OAuthController],
  providers: [OAuthService, ClientsService],
  exports: [OAuthService],
})
export class OAuthModule {}
