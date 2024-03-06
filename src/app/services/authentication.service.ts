import {
  HttpClient,
  HttpHeaders,
  HttpParams,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  isAuthenticated: boolean = false;
  roles: any;
  username: any;
  accessToken!: any;
  constructor(private http: HttpClient, private router: Router) {}

  public login(username: string, password: string) {
    let options = {
      headers: new HttpHeaders().set(
        'Content-Type',
        'application/x-www-form-urlencoded'
      ),
    };
    let params = new HttpParams()
      .set('username', username)
      .set('password', password);
    return this.http.post(
      environment.backendHost + '/auth/login',
      params,
      options
    );
  }
  public loadProfile(data: any) {
    this.isAuthenticated = true;
    this.accessToken = data['accessToken'];
    let decodeToken: any = jwtDecode(this.accessToken);
    this.username = decodeToken.sub;
    this.roles = decodeToken.scope;
    window.sessionStorage.setItem('jwt-token', this.accessToken);
  }
  public logout() {
    this.isAuthenticated = false;
    this.accessToken = undefined;
    this.username = undefined;
    this.roles = undefined;
    window.sessionStorage.removeItem('jwt-token');
    this.router.navigateByUrl('/login');
  }
  loadJwtTokenFromSessionStorage() {
    let token = window.sessionStorage.getItem('jwt-token');
    if (token) {
      this.loadProfile({ accessToken: token });
      this.router.navigateByUrl('/admin/customers');
    }
  }
}
