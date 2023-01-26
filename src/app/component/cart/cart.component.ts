import { Component } from '@angular/core';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  constructor(private cartService: CartService) { }

  get quantityItems(): number {
    return this.cartService.getQuantityItems();
  }

  get quantityProducts(): number {
    return this.cartService.getQuantityProducts();
  }

  get totalPrice(): number {
    return this.cartService.getTotalPrice();
  }
}
