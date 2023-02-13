import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductComponent } from './component/product/product.component';
import { ProductListComponent } from './component/product-list/product-list.component';
import { NavBarComponent } from './component/nav-bar/nav-bar.component';
import { CartComponent } from './component/cart/cart.component';
import { CartItemComponent } from './component/cart-item/cart-item.component';
import { ReversePipe } from './pipe/reverse.pipe';
import { SnakeCasePipe } from './pipe/snake-case.pipe';
import { SelectElementDirective } from './directive/select-element.directive';
import { CartService } from './service/cart.service';
import { ProductDetailComponent } from './component/product-detail/product-detail.component';
import { ToastComponent } from './component/toast/toast.component';
import { ToastListComponent } from './component/toast-list/toast-list.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    ProductListComponent,
    NavBarComponent,
    CartComponent,
    CartItemComponent,
    ReversePipe,
    SnakeCasePipe,
    SelectElementDirective,
    ProductDetailComponent,
    ToastComponent,
    ToastListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [CartService],
  bootstrap: [AppComponent]
})
export class AppModule { }
