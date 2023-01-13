import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
//import { Observable } from 'rxjs/Rx';

import { PoDialogService } from '@po-ui/ng-components';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard /*implements CanActivate*/ {



  constructor(private router: Router, private poAlert: PoDialogService, private authService: AuthService ) { }

  teste(){
    return false;
  }
  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<Observable<boolean> | boolean> {
      if (!this.authService.isAuthenticated()) {
        return false;
      }
      //debugger
      if (this.authService.isTokenExpired()) {
        const isRefreshSuccess = this.authService.refreshToken();
        if (await isRefreshSuccess) {
          return true;
        } else {
          location.reload();
          return false;
        }
      }

      return true;
  }

}
