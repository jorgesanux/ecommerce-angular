import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/service/auth.service';
import { ToastListService } from 'src/app/service/toast-list.service';
import { User } from 'src/model/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  profile!: User;


  private tokenSubscription!: Subscription;

  constructor(
    // private userService: UserService,
    private authService: AuthService,
    private toastService: ToastListService
  ) { }
  ngOnInit(): void {
    this.tokenSubscription = this.authService.token$
      .subscribe((token: string | undefined) => token && sessionStorage.setItem("token", token));
  }


  login(): void {
    this.authService.login({
      email: "john@mail.com",
      password: "changeme"
    }).subscribe((token: string) => {
      sessionStorage.setItem("token", token);
    });
  }

  getProfile(): void {
    const token: string | null = sessionStorage.getItem("token");
    if (token === null) {
      this.toastService.warning("No se encuentra autenticado, por favor iniciar sesión");
      return;
    }
    this.authService.getProfile(token)
      .subscribe((user: User) => {
        console.log(user);
      })
  }

  loginAndGetProfile(): void {
    this.authService.loginAndGetProfile({
      email: "john@mail.com",
      password: "changeme"
    });
  }
}
