import { Component } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { ToastListService } from 'src/app/service/toast-list.service';
import { UserService } from 'src/app/service/user.service';
import { User } from 'src/model/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(
    // private userService: UserService,
    private authService: AuthService,
    private toastService: ToastListService
  ){}


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
    if(token === null){
      this.toastService.warning("No se encuentra autenticado, por favor iniciar sesión");
      return ;
    }
    this.authService.getProfile(token)
      .subscribe((user: User) => {
        console.log(user);
      })
  }
}
