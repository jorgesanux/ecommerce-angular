import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserCreateDTO } from 'src/dto/user.dto';

import { environment } from 'src/environments/environment';
import { User } from 'src/model/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public static API_URL = `${environment.HOST_API_STORE}/api/users`;

  constructor(
    private http: HttpClient
  ) { }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(UserService.API_URL);
  }

  createUser(user: UserCreateDTO): Observable<User> {
    return this.http.post<User>(UserService.API_URL, user);
  }
}
