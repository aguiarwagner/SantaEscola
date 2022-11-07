import { AuthService } from './guards/auth.service';
import { Mapa } from './Shared/mapa';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  loginUser = 'http://localhost:84/v1/account/login/';
  getTester = 'http://localhost:84/v1/account/employee';
  constructor(
    private http: HttpClient,
    private router: Router,
  ) {  }

  LogaUser(mapa: Mapa) {
    let headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/json'
    })

    return this.http.post(this.loginUser, mapa, { headers: headers })
    .pipe(map(res =>
        res
    ));
  }

  getTeste(mapa: Mapa) {
    let headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization': 'Bearer '+ JSON.parse(localStorage.getItem('access_token') || '{}')
    })

    return this.http.get(this.getTester,  { headers: headers })
    .pipe(map(res =>
        res
    ));
  }
}
