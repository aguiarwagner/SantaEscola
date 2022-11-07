import { AppComponent } from './../app.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import jwt_decode from 'jwt-decode';
import { HttpService } from '../http.service';
import { Mapa } from '../Shared/mapa';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public mostraMenu = false;
  //Ambietne de teste
  //private url = 'https://tdi.customerfi.com/cloudpass/launchpad/launchApp/c35d61bb2d384094915f1888095eba09/9lndgj53tx3zysjx1410282663331' + 'auth';
  //Ambiente de produção.
  private url = 'https://totvs.fluigidentity.com/cloudpass/launchpad/launchApp/5da6555558614476b267c17ea4c3b83b/zf0y84vo717g8hjx' + 'auth';

  public AccessTokenKey = 'access_token';
  public RefreshTokenKey = 'refresh_token';
  public userLogado = "";
  mapa: Mapa = new Mapa();

  constructor(private _httpClient: HttpClient, private httpService: HttpService,  private router: Router) {}


  isAuthenticated(): boolean {
    if (this.hasAccessToken()) {
      // logged in so return true
      return true;
    }
    return false;
  }

  async login(username: string, password: string) {
    let token: any;
    this.mapa.username = username;
    this.mapa.password = password
    this.httpService.LogaUser(this.mapa).subscribe((resposta) => {
      token = resposta
      localStorage.setItem('access_token', JSON.stringify(token.token));
      this.mostraMenu = true;
      this.router.navigate(['']);
      return true
    });

  }

  hasAccessToken(): boolean {
    if (this.getAccessToken()) return true;
    return false;
  }

  setAccessToken(token: string) {
    localStorage.setItem(this.AccessTokenKey, JSON.stringify(token));

  }

  getAccessToken(): any {
    return JSON.parse(localStorage.getItem(this.AccessTokenKey) || '{}');
  }

  setRefreshToken(token: string): void {
    localStorage.setItem(this.RefreshTokenKey, JSON.stringify(token));
  }

  getRefreshToken(): any {
    return JSON.parse(localStorage.getItem(this.RefreshTokenKey) || '{}');
  }

  async refreshToken(): Promise<boolean> {
    const token = await this._httpClient
      .post(`${this.url}/refresh-token`, this.getRefreshTokenBody())
      .toPromise()
      .catch((ex) => {
        this.login("","");
      });

    return true;
  }

  private getRefreshTokenBody(): any {
    return {
      accessToken: this.getAccessToken(),
      refreshToken: this.getRefreshToken(),
    };
  }

  isTokenExpired(): boolean {
    if (!this.hasAccessToken())
      throw new Error('Não é possivel renovar um token inexistente');

    const jwt = this.getJwt();
    return Date.now() >= jwt.exp * 1000;
  }

  getUsertoken(){
    const jwt = this.getJwt();
    return jwt.email;
  }

  getJwt(): any {
    const jwt = jwt_decode<any>(this.getAccessToken());
    return jwt;
  }

}
