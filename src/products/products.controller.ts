import { Controller, Get, Post, Res, Param, Body } from '@nestjs/common';
import { Response } from 'express';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  //GetAllProducts
  @Get()
  getAllProducts(@Res() res: Response) {
    const products = this.productsService.getAllProducts();
    res.render('products', { products });
  }

  //AddProduct
  @Post()
  addProduct(@Body() product: any, @Res() res: Response) {
    this.productsService.addProduct(product);
    const products = this.productsService.getAllProducts();
    res.render('products', { products });
  }

  //DeleteProduct
  @Post(':id')
  deleteProduct(@Param('id') id: string, @Res() res: Response) {
    this.productsService.deleteProduct(Number(id));
    res.redirect('/products');
  }
}
