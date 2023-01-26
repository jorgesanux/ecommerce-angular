import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/service/cart.service';
import { ProductListService } from 'src/app/service/product-list.service';
import { Product } from 'src/model/product.model';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  providers: [ProductListService]
})
export class ProductListComponent implements OnInit {
  products: Product[] = [ ];

  constructor(
    private cartService: CartService,
    private productListService: ProductListService
  ) { }

  ngOnInit(): void {
    this.productListService.getAllProducts()
      .subscribe(products => {
        this.products = products;
      });
  }

  addProductToCart(product: Product): void {
    this.cartService.addProduct(product);
  }
}
