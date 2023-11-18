import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../service/login.service';
import { UtilsServiceService } from '../service/utils.service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  private loginauth = inject(LoginService);
  private utilserv = inject(UtilsServiceService);

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    let user = localStorage.getItem('user');

    return new Promise((resolve) => {
      this.loginauth.getAuth().onAuthStateChanged((auth) => {

        if (auth) {
          
          if (user){ resolve(true);}
          else{
            this.utilserv.routerlink('/home');
            resolve(false);
          }
        } 
        else{
          this.utilserv.routerlink('/home');
          resolve(false);
        }
      })

    })
  }
}
