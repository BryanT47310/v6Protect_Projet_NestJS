import {
  Controller,
  Get,
  Post,
  Delete,
  Res,
  Param,
  Body,
} from '@nestjs/common';
import { Response } from 'express';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  getAllProducts(@Res() res: Response) {
    const products = this.productsService.getAllProducts();
    res.render('products', { products });
  }

  @Post()
  addProduct(@Body() product: any, @Res() res: Response) {
    this.productsService.addProduct(product);
    const products = this.productsService.getAllProducts();
    res.render('products', { products });
  }

  @Delete(':id')
  deleteProduct(@Param('id') id: string) {
    return this.productsService.deleteProduct(Number(id));
  }
}
