import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { BehaviorSubject, map, Observable, throwError } from 'rxjs';
//import { tokenSchema } from '../../types/Token';

export type decodedToken = {
  userId:string;
  displayName:string;
  role:'admin' | 'customer' | 'guest';
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl='http://localhost:3000/api';

  // 1.- Maneja el estado de autenticación
  private _isLoggedIn$ = new BehaviorSubject<boolean>(!!localStorage.getItem('token'));
  isLoggedIn$ = this._isLoggedIn$.asObservable();

  private _user$ = new BehaviorSubject<decodedToken | null>(this.decodedToken);
  user$ = this._user$.asObservable();

  constructor(private httpClient:HttpClient) {}

  get token():string | null {
    return localStorage.getItem('token');
  }

  get refreshStorageToken():string | null {
    return localStorage.getItem('refreshToken');
  }

  get decodedToken():decodedToken | null {
    const token = this.token;
    // si hay token lo decodifica sino retirna null
    return token ? jwtDecode<decodedToken>(token): null;
  }

  register(data: any): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}/auth/register`, data);
  }

  login(data: {email:string; password:string}): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}/auth/login`, data).pipe(
      map((res: any) => {
        //almacena el token y el refresh
        localStorage.setItem('token', res.token);
        localStorage.setItem('refreshToken', res.refreshToken.toString()),

        this._isLoggedIn$.next(true);
        this._user$.next(this.decodedToken);

        return res;
      })
    );
  }

  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');

    this._isLoggedIn$.next(false);
    this._user$.next(null);
  }

  refreshToken(refreshToken:string){
    return this.httpClient.post(`${this.baseUrl}/auth/refresh-token`, { token: refreshToken });
  }

  checkEmailExist(email:string): Observable<boolean>{
    return this.httpClient
    .get<{exists:boolean}>(`${this.baseUrl}/auth/check-email`, { params: {email}})
    .pipe(map((res) => res.exists));
  }
}