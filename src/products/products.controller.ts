import { Controller, Get, Post, Res, Param, Body } from '@nestjs/common';
import { Response } from 'express';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  //Récupération de tous les produits puis affichage dans la view products.hbs
  @Get()
  getAllProducts(@Res() res: Response) {
    const products = this.productsService.getAllProducts();
    res.render('products', { products });
  }

  //Ajout d'un produit puis redirection vers la view products.hbs
  @Post()
  addProduct(@Body() product: any, @Res() res: Response) {
    this.productsService.addProduct(product);
    res.redirect('/products');
  }

  //Suppression du produit puis redirection vers la view products.hbs
  @Post(':id')
  deleteProduct(@Param('id') id: string, @Res() res: Response) {
    this.productsService.deleteProduct(Number(id));
    res.redirect('/products');
  }
}
