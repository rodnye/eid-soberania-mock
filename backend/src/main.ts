import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import * as pkg from '../package.json';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT', 3000);
  const isProduction = configService.get('NODE_ENV') === 'production';

  app.useStaticAssets(join(__dirname, '../../public/dist'), {
    index: false,
    fallthrough: true,
  });

  if (!isProduction) {
    app.enableCors({
      origin: configService.get<string>(
        'FRONTEND_DEV_URL',
        'http://localhost:4200',
      ),
      credentials: true,
    });
  }

  await app.listen(port);
  console.log(
    `::: ${pkg.name}@${pkg.version} running on http://localhost:${port}`,
  );
}

bootstrap().catch((err) => {
  console.error('Error during application bootstrap:', err);
  process.exit(1);
});
