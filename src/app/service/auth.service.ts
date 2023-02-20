import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, switchMap } from 'rxjs';
import { LoginDTO } from 'src/dto/login.dto';
import { environment } from 'src/environments/environment';
import { User } from 'src/model/user.model';
import { MapperHelper } from '../helper/Mapper.helper';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public static API_URL = `${environment.HOST_API_STORE}/api/auth`;

  private profileSubject: BehaviorSubject<User | undefined>;
  profileInfo$: Observable<User | undefined>;

  private tokenSubject: BehaviorSubject<string | undefined>;
  token$: Observable<string | undefined>;

  constructor(
    private http: HttpClient
  ) {
    this.profileSubject = new BehaviorSubject<User | undefined>(undefined);
    this.profileInfo$ = this.profileSubject.asObservable();

    this.tokenSubject = new BehaviorSubject<string | undefined>(undefined);
    this.token$ = this.tokenSubject.asObservable();
  }

  login(data: LoginDTO): Observable<string> {
    return this.http.post<Record<string, string>>(AuthService.API_URL + "/login", data)
      .pipe(
        map(MapperHelper.APIToTokenString)
      );
  }

  getProfile(token: string): Observable<User> {
    const headers: HttpHeaders = new HttpHeaders({
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
    });
    return this.http.get<User>(AuthService.API_URL + "/profile", {
      headers
    });
  }

  loginAndGetProfile(data: LoginDTO): void {
    this.login(data)
      .pipe(
        switchMap((token: string) => {
          this.tokenSubject.next(token);
          return this.getProfile(token);
        })
      ).subscribe((user: User) => {
        this.profileSubject.next(user);
      })
  }
}
