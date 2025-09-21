import { Controller, Get, Inject, Res, Req } from '@nestjs/common';
import type { Response, Request } from 'express';
import { FrontendService } from './frontend/frontend.service';

@Controller('/')
export class AppController {
  @Inject(FrontendService) private readonly frontendService: FrontendService;

  @Get()
  async root(@Res() res: Response) {
    await this.frontendService.serveFrontend(res);
  }

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

  @Get('*')
  frontendRoutes(@Res() res: Response, @Req() req: Request) {
    if (this.frontendService.getFrontendUrl() === '') {
      // vite handles the routing
      res.sendFile('index.html', { root: './public' });
    } else {
      // redirect to Vite dev server
      const originalUrl = req.originalUrl;
      const frontendUrl = this.frontendService.getFrontendUrl();

      res.redirect(`${frontendUrl}${originalUrl}`);
    }
  }
}
