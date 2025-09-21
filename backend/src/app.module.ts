import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FrontendService } from './frontend/frontend.service';
import { ClientsService } from './clients/clients.service';
import { UsersService } from './users/users.service';
import { OAuthModule } from './oauth/oauth.module';

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
    OAuthModule,
  ],
  controllers: [AppController],
  providers: [
    ConfigService,
    FrontendService,
    AppService,
    ClientsService,
    UsersService,
  ],
})
export class AppModule {}
