import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  //Redirection vers la page des produits comme page par defaut
  @Get()
  redirectToProducts(@Res() res: Response) {
    res.redirect('/products');
  }
}
