import { Injectable } from '@nestjs/common';
import * as fs from 'fs';

@Injectable()
export class ProductsService {
  private readonly productsFilePath = 'data/products.json';
  private products = [];

  constructor() {
    this.loadProducts();
  }

  //Récupération des produits dans le fichier JSON
  private loadProducts() {
    try {
      const fileContent = fs.readFileSync(this.productsFilePath, 'utf-8');
      this.products = JSON.parse(fileContent);
    } catch (error) {
      this.products = [];
    }
  }

  //Mise à jour du fichier JSON avec les nouveaux produits
  private saveProducts() {
    fs.writeFileSync(
      this.productsFilePath,
      JSON.stringify(this.products, null, 2),
    );
  }

  //Récupération de tous les produits
  getAllProducts() {
    return this.products;
  }

  //Ajout d'un produit dans le fichier JSON
  addProduct(product: any) {
    const newProduct = {
      id: this.products.length + 1,
      ...product,
    };
    this.products.push(newProduct);
    this.saveProducts();
    return newProduct;
  }

  //Suppression d'un produit dans le fichier JSON
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
