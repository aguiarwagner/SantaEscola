import { AuthService } from './guards/auth.service';
import { Mapa } from './Shared/mapa';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Router } from '@angular/router';
//import { ResponsePageable } from './ResponsePageable';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  loginUser = 'http://localhost:84/v1/account/login/';
  getCadastroCriancas = 'http://localhost:84/api/DadosCriancas';
  urlApiReunioes = 'http://localhost:84/api/CabecalhoReuniao';
  urlApiReunioesentradaSaida = 'http://localhost:84/api/EntradaSaidaReuniao';
  urlApiEntradaSaida = 'http://localhost:84/api/EntradaSaida';
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

    return this.http.get(this.getCadastroCriancas,  { headers: headers })
    .pipe(map(res =>
        res
    ));
  }

  getCriancas() {
    let headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization': 'Bearer '+ JSON.parse(localStorage.getItem('access_token') || '{}')
    })

    return this.http.get(this.getCadastroCriancas,  { headers: headers })
    .pipe(map(res =>
        res
    ));
  }

  postCriancas(mapa: Mapa)  {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': 'Bearer '+ JSON.parse(localStorage.getItem('access_token') || '{}')
      })

    return this.http.post(this.getCadastroCriancas, mapa,  { headers: headers });
  }

  putCriancas(Recno: number, mapa: Mapa)  {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': 'Bearer '+ JSON.parse(localStorage.getItem('access_token') || '{}')
      })

    return this.http.put(this.getCadastroCriancas + '/' + Recno,  mapa,  { headers: headers });
  }

  getCriancasId(id: number): Observable<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': 'Bearer '+ JSON.parse(localStorage.getItem('access_token') || '{}')
      })

    return this.http.get(this.getCadastroCriancas + '/' + id,  { headers: headers });

  }

  deleteCriancas(Recno: number, mapa: Mapa)  {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': 'Bearer '+ JSON.parse(localStorage.getItem('access_token') || '{}')
      })

    return this.http.delete(this.getCadastroCriancas + '/' + Recno,  { headers: headers });
  }

  getReunioes() {
    let headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization': 'Bearer '+ JSON.parse(localStorage.getItem('access_token') || '{}')
    })

    return this.http.get(this.urlApiReunioes,  { headers: headers })
    .pipe(map(res =>
        res
    ));
  }

  getReunioesId(id: number): Observable<any> {
    let headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization': 'Bearer '+ JSON.parse(localStorage.getItem('access_token') || '{}')
    })

    return this.http.get(this.urlApiReunioes + '/' + id,  { headers: headers })
    .pipe(map(res =>
        res
    ));
  }

  postReuniao(mapa: Mapa)  {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': 'Bearer '+ JSON.parse(localStorage.getItem('access_token') || '{}')
      })

    return this.http.post(this.urlApiReunioes, mapa,  { headers: headers });
  }

  putReuniao(Recno: number, mapa: Mapa)  {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': 'Bearer '+ JSON.parse(localStorage.getItem('access_token') || '{}')
      })

    return this.http.put(this.urlApiReunioes + '/' + Recno,  mapa,  { headers: headers });
  }

  deleteReuniao(Recno: number, mapa: Mapa)  {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': 'Bearer '+ JSON.parse(localStorage.getItem('access_token') || '{}')
      })

    return this.http.delete(this.urlApiReunioes + '/' + Recno,  { headers: headers });
  }


  postReuniaoEntradaSaida(mapa: Mapa)  {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': 'Bearer '+ JSON.parse(localStorage.getItem('access_token') || '{}')
      })

    return this.http.post(this.urlApiReunioesentradaSaida, mapa,  { headers: headers });
  }

  putReuniaoEntradaSaida(Recno: number, mapa: Mapa)  {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': 'Bearer '+ JSON.parse(localStorage.getItem('access_token') || '{}')
      })

    return this.http.put(this.urlApiReunioesentradaSaida + '/' + Recno,  mapa,  { headers: headers });
    //return this.http.put(this.urlApiReunioesentradaSaida,  mapa,  { headers: headers });
  }

  /*
  getEntradaSaida() {
    let headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization': 'Bearer '+ JSON.parse(localStorage.getItem('access_token') || '{}')
    })

    return this.http.get(this.urlApiEntradaSaida,  { headers: headers })
    .pipe(map(res =>
        res
    ));
  }
  */

  getEntradaSaida(id: number, idReuniao: number, idCrianca: number): Observable<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': 'Bearer '+ JSON.parse(localStorage.getItem('access_token') || '{}')
      })

    return this.http.get(this.urlApiEntradaSaida + '/' + id + '?idReuniao=' + idReuniao + '&idCrianca=' + idCrianca ,  { headers: headers });

  }

}
