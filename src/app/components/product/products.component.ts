import { Component } from '@angular/core';
import { Product } from '../../models/product.model';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {
  
  products: Product[] = [];

  constructor(
    private productsService: ProductsService
  ) {}

  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts(): void { 
    this.productsService.getAllSimple()
      .subscribe({
        next: (products: Product[]) => {
          this.products = products;
        }
      });
  }

}
