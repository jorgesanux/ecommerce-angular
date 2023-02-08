import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { CartService } from 'src/app/service/cart.service';
import { ProductService } from 'src/app/service/product-list.service';
import { ProductCreateDTO } from 'src/dto/product.dto';
import { Product } from 'src/model/product.model';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  providers: [ProductService]
})
export class ProductListComponent implements OnInit, OnDestroy {
  private subscriptionDetailProduct!: Subscription;
  private subscriptionProducts!: Subscription;

  products: Product[] = [ ];
  productSelectedForDetail!: Product | null;

  constructor(
    private cartService: CartService,
    private productListService: ProductService
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

  createProduct(): void {
    const newProduct: ProductCreateDTO = {
      categoryId: 5,
      description: "Prueba creación de producto por POST",
      images: [
        "https://placeimg.com/640/480/any"
      ],
      price: 2000,
      title: "Productos random"
    };
    this.productListService.createProduct(newProduct)
      .subscribe((product: Product) => {
        this.products.unshift(product);
      });
  }

  updateProductListFromDetail(product: Product): void {
    const index = this.products.findIndex(prod => prod.id === product.id);
    if(index === -1) return ;

    this.products[index] = product;
  }
}
