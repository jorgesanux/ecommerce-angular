import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { CartService } from 'src/app/service/cart.service';
import { NavBarService } from 'src/app/service/nav-bar.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
  providers: [NavBarService]
})
export class NavBarComponent implements OnInit, OnDestroy {
  currentDate: Date = new Date();
  quantityProducts = 0;
  categories = [
    "Todo",
    "Accesorios",
    "Zapatos",
    "Camisas",
    "Relojes",
    "Saco",
    "Perfumes"
  ];

  private updateClockSubscription!: Subscription;
  private cartQuantitySubscription!: Subscription;

  constructor(
    private navbarService: NavBarService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.updateClockSubscription = this.navbarService.updateClock()
      .subscribe((currentDate) => {
        this.currentDate = currentDate;
      });
    this.cartQuantitySubscription = this.cartService.cartQuantity$
      .subscribe( (cartQuantityItems: number) => {
        this.quantityProducts = cartQuantityItems;
      });
  }

  ngOnDestroy(): void {
    this.updateClockSubscription.unsubscribe();
    this.cartQuantitySubscription.unsubscribe();
  }

}
