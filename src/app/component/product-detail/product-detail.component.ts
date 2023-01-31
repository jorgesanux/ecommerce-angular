import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from 'src/model/product.model';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent {
  @Input() product!: Product;
  @Output() toClose: EventEmitter<void> = new EventEmitter();

  closeDetail(): void {
    this.toClose.emit();
  }
}
