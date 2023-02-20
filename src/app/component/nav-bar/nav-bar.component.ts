import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/service/auth.service';
import { CartService } from 'src/app/service/cart.service';
import { NavBarService } from 'src/app/service/nav-bar.service';
import { User } from 'src/model/user.model';

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
    "Camisas"
  ];
  profile!: User | undefined;

  private updateClockSubscription!: Subscription;
  private cartQuantitySubscription!: Subscription;
  private profileSubscription!: Subscription;

  constructor(
    private navbarService: NavBarService,
    private cartService: CartService,
    private authService: AuthService,
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
    this.profileSubscription = this.authService.profileInfo$
      .subscribe((user: User | undefined) => this.profile = user);
  }

  ngOnDestroy(): void {
    this.updateClockSubscription.unsubscribe();
    this.cartQuantitySubscription.unsubscribe();
    this.profileSubscription.unsubscribe();
  }

}
