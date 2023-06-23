import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
//import { Observable } from 'rxjs/Rx';

import { PoDialogService } from '@po-ui/ng-components';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { HttpService } from '../http.service';

@Injectable()
export class AuthGuard /*implements CanActivate*/ {
  AuthService: AuthService = new AuthService( this._httpClient, this.httpService, this.router);



  constructor(private router: Router, private poAlert: PoDialogService, private authService: AuthService,private _httpClient: HttpClient, private httpService: HttpService, ) { }

  teste(){
    return false;
  }
  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<Observable<boolean> | boolean> {
      let lacesso = true;
      let dadosUser =  this.AuthService.getUsertoken();
      debugger
      if (!this.authService.isAuthenticated()) {
        return false;
      }

      if (this.authService.isTokenExpired()) {
        this.router.navigate(['']);
        location.reload();
        return false;
        //if (await isRefreshSuccess) {
        //  return true;
        //} else {
        //  location.reload();
        //  return false;
        //}
      }
      /*if (route.routeConfig != undefined ) {
        if( route.routeConfig.path != ""){
          if (route.routeConfig.path == "relatorios" && dadosUser.role != 'manager'){
            lacesso = false;
            //return true;
          } else {
            lacesso = true;
          }  

        }
              
      } 

      if (lacesso == false){
        this.poAlert.alert({title: "Usuário não autorizado!", message: "Por favor, entre em contato com suporte."});
        //this.router.navigate(['']);
        return false;
      } else {
        return true;
      }*/


      return true;
  }

}
