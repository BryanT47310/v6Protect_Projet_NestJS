import { Injectable } from '@nestjs/common';
import * as fs from 'fs';

@Injectable()
export class ProductsService {
  private readonly productsFilePath = 'data/products.json';
  private products = [];

  constructor() {
    this.loadProducts();
  }

  private loadProducts() {
    try {
      const fileContent = fs.readFileSync(this.productsFilePath, 'utf-8');
      this.products = JSON.parse(fileContent);
    } catch (error) {
      this.products = [];
    }
  }

  private saveProducts() {
    fs.writeFileSync(this.productsFilePath, JSON.stringify(this.products, null, 2));
  }

  getAllProducts() {
    return this.products;
  }

  addProduct(product: any) {
    const newProduct = {
      id: this.products.length + 1,
      ...product,
    };
    this.products.push(newProduct);
    this.saveProducts();
    return newProduct;
  }

  deleteProduct(id: number) {
    const index = this.products.findIndex((product) => product.id === id);
    if (index !== -1) {
      const deletedProduct = this.products.splice(index, 1)[0];
      this.saveProducts();
      return deletedProduct;
    }
    return null;
  }
}