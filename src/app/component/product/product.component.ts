import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ProductService } from 'src/app/service/product.service';
import { Product } from 'src/model/product.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {
  @Input() product!: Product;
  @Output() toCart: EventEmitter<Product> = new EventEmitter();
  @Output() toDetail: EventEmitter<string> = new EventEmitter();
  @Output() toDelete: EventEmitter<Product> = new EventEmitter();

  constructor(
    private productService: ProductService
  ){ }

  addToCart(): void {
    this.toCart.emit(this.product);
  }

  showDetail(): void {
    this.toDetail.emit(this.product.id);
  }

  deleteProduct(): void {
    this.productService.deleteProduct(this.product.id)
      .subscribe({
        next: (isDeleted: boolean) => {
          if(!isDeleted) return;
          this.toDelete.emit(this.product);
        },
        error: (error: unknown) => {
          if(error instanceof Error){
            console.error(error.message);
          }
        }
      })
  }
}
