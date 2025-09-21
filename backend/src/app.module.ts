import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsService } from './clients/clients.service';
import { UsersService } from './users/users.service';
import { OAuthController } from './oauth/oauth.controller';
import { OAuthService } from './oauth/oauth.service';
import { FrontendController } from './frontend/frontend.controller';
import { FrontendService } from './frontend/frontend.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      validate(config) {
        return config;
      },
      validationSchema: {
        PORT: Number,
        FRONTEND_URL: String,
      },
    }),
  ],
  controllers: [AppController, OAuthController, FrontendController],
  providers: [
    ConfigService,
    AppService,
    ClientsService,
    UsersService,
    OAuthService,
    FrontendService,
  ],
})
export class AppModule {}
