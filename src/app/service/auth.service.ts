import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { LoginDTO } from 'src/dto/login.dto';
import { environment } from 'src/environments/environment';
import { User } from 'src/model/user.model';
import { MapperHelper } from '../helper/Mapper.helper';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public static API_URL = `${environment.HOST_API_STORE}/api/auth`;

  constructor(
    private http: HttpClient
  ) { }

  login(data: LoginDTO): Observable<string> {
    return this.http.post<Record<string, string>>(AuthService.API_URL + "/login", data)
      .pipe(
        map(MapperHelper.APIToTokenString)
      );
  }

  getProfile(token: string): Observable<any> {
    const headers: HttpHeaders = new HttpHeaders({
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
    });
    return this.http.get<User>(AuthService.API_URL + "/profile", {
      headers
    });
  }
}
