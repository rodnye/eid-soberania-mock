import { Controller, Get, Res } from '@nestjs/common';
import type { Response } from 'express';

@Controller('/')
export class AppController {
  @Get('/api/ping')
  pingRoute(@Res() res: Response) {
    res.send({ message: 'pong!' });
  }

  @Get('/api/*path')
  apiFallback(@Res() res: Response) {
    // Para rutas API que no existen
    res.status(404).json({
      message: 'Endpoint not found',
      timestamp: new Date().toISOString(),
    });
  }
}
