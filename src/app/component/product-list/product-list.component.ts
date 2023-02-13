import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { CartService } from 'src/app/service/cart.service';
import { ProductService } from 'src/app/service/product.service';
import { ToastListService } from 'src/app/service/toast-list.service';
import { ProductCreateDTO } from 'src/dto/product.dto';
import { Product } from 'src/model/product.model';
import { ToastType } from 'src/model/toast.model';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  providers: [ProductService]
})
export class ProductListComponent implements OnInit, OnDestroy {
  private subscriptionDetailProduct!: Subscription;
  private subscriptionProducts!: Subscription;
  private limit = 10;
  private offset = 0;

  products: Product[] = [ ];
  productSelectedForDetail!: Product | null;

  constructor(
    private cartService: CartService,
    private productListService: ProductService,
    private toastListService: ToastListService
  ) { }

  ngOnInit(): void {
    this.loadMoreProducts();
  }

  ngOnDestroy(): void {
    this.subscriptionProducts.unsubscribe();
  }

  errorHandler(error: unknown) {
    if(error instanceof Error){
      console.error(error.message);
      this.toastListService.error(error.message);
    }
  }

  addProductToCart(product: Product): void {
    this.cartService.addProduct(product);
    this.toastListService.info("Producto agregado al carrito");
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

  loadMoreProducts(limit = this.limit, offset = this.offset): void{
    if(this.subscriptionProducts) this.subscriptionProducts.unsubscribe();
    this.toastListService.info("Cargando productos...");

    this.subscriptionProducts = this.productListService.getProducts(limit, offset)
      .subscribe({
        next: (products: Product[]) => {
          if(products.length <= 0) return;

          this.offset += this.limit;
          this.products = this.products.concat(products);
        },
        error: this.errorHandler.bind(this)
      });
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
      .subscribe({
        next: (product: Product) => {
          this.products.unshift(product);
          this.toastListService.success("Producto creado");
        },
        error: this.errorHandler.bind(this)
      });
  }

  updateProductListFromDetail(product: Product): void {
    const index = this.products.findIndex(prod => prod.id === product.id);
    if(index === -1) return ;

    this.products[index] = product;
    this.toastListService.success("Producto actualizado");
  }

  deleteProduct(product: Product): void {
    const index = this.products.findIndex(prod => prod.id === product.id);
    if(index === -1) return ;

    this.products.splice(index, 1);

    this.toastListService.success("Producto eliminado");
  }
}
