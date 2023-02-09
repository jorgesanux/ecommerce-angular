import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ProductService } from 'src/app/service/product.service';
import { ProductUpdateDTO } from 'src/dto/product.dto';
import { Product } from 'src/model/product.model';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent {
  @Input() product!: Product;
  @Output() toClose: EventEmitter<void> = new EventEmitter();
  @Output() toUpdate: EventEmitter<Product> = new EventEmitter();

  constructor(
    private productService: ProductService
  ){ }

  closeDetail(): void {
    this.toClose.emit();
  }

  updateProduct(): void {
    this.productService.updateProduct<ProductUpdateDTO>(this.product.id, {
      title: `${this.product.name} ${crypto.randomUUID().substring(0,4)}`
    }).subscribe((product: Product)=>{
      this.product = product;
      this.toUpdate.emit(this.product);
    });
  }
}
