import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { CartService } from 'src/app/service/cart.service';
import { ProductListService } from 'src/app/service/product-list.service';
import { Product } from 'src/model/product.model';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  providers: [ProductListService]
})
export class ProductListComponent implements OnInit, OnDestroy {
  private subscriptionDetailProduct!: Subscription;
  private subscriptionProducts!: Subscription;

  products: Product[] = [ ];
  productSelectedForDetail!: Product | null;

  constructor(
    private cartService: CartService,
    private productListService: ProductListService
  ) { }

  ngOnInit(): void {
    this.subscriptionProducts = this.productListService.getAllProducts()
      .subscribe((products: Product[]) => {
        this.products = products;
      });
  }

  ngOnDestroy(): void {
    this.subscriptionProducts.unsubscribe();
  }

  addProductToCart(product: Product): void {
    this.cartService.addProduct(product);
  }

  showProductDetail(id: string): void {
    this.subscriptionDetailProduct = this.productListService.getProductById(id)
      .subscribe((product: Product) => {
        this.productSelectedForDetail = product;
      });
  }

  closeProductDetail(): void {
    this.productSelectedForDetail = null;
    this.subscriptionDetailProduct.unsubscribe();
  }
}
