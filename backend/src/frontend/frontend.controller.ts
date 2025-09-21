import { Controller, Get, Req, Res } from '@nestjs/common';
import { FrontendService } from './frontend.service';
import { join } from 'path';
import type { Request, Response } from 'express';

@Controller('/')
export class FrontendController {
  constructor(private service: FrontendService) {}

  @Get('*')
  async serveFrontend(@Res() res: Response, @Req() req: Request) {
    if (this.service.getIsProduction()) {
      // in production serve SPA
      res.sendFile('index.html', {
        root: join(__dirname, '..', '../../public/dist'),
      });
    } else {
      // otherwise, redirect to vite dev server
      if (await this.service.isFrontendDevActive()) {
        const originalUrl = req.originalUrl;
        res.redirect(`${this.service.getFrontendUrl()}${originalUrl}`);
      } else res.status(404).send({ message: 'Frontend is not launched yet' });
    }
  }
}
