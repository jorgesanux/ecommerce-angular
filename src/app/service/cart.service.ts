import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CartItem } from 'src/model/cart-item.model';
import { Product } from 'src/model/product.model';

@Injectable()
export class CartService {
  private itemList: Map<string, CartItem>;

  private cartQuantitySubject: BehaviorSubject<number>;
  cartQuantity$: Observable<number>;

  constructor() {
    this.itemList = new Map();
    this.cartQuantitySubject = new BehaviorSubject<number>(0);
    this.cartQuantity$ = this.cartQuantitySubject.asObservable();
  }

  getQuantityItems(): number {
    return this.itemList.size;
  }

  getQuantityProducts(): number {
    let sum = 0;
    for (const item of this.itemList.values()) sum += item.quantity;
    return sum;
  }

  getTotalPrice(): number {
    let sum = 0;
    for (const item of this.itemList.values()) sum += (item.quantity * item.product.price);
    return sum;
  }

  getItemList(): Map<string, CartItem> {
    return this.itemList;
  }

  getProductList(): Product[] {
    const products: Product[] = [];
    for (const item of this.itemList.values()) products.push(item.product);
    return products;
  }

  addProduct(product: Product): void {
    const item: CartItem | undefined = this.itemList.get(product.id);
    if(!item){
      this.itemList.set(product.id, {
        id: crypto.randomUUID(),
        product,
        quantity: 1
      });
      this.cartQuantitySubject.next(this.getQuantityItems());
      return;
    }
    item.quantity++;
  }
}
