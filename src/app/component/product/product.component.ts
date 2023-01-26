import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from 'src/model/product.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {
  @Input() product!: Product;
  @Output() toCart: EventEmitter<Product> = new EventEmitter();

  addToCart(): void {
    this.toCart.emit(this.product);
  }
}
