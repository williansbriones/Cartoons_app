import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../service/login.service';
import { UtilsServiceService } from '../service/utils.service.service';
import { User } from 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class NoAuthGuard implements CanActivate {

  loginauth = inject(LoginService);
  utilserv = inject(UtilsServiceService);

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    let user = localStorage.getItem('user');


    return new Promise((resolve) => {
      this.loginauth.getAuth().onAuthStateChanged((auth) => {
        if (!auth || user == null) {
          resolve(true)
        } else {
          
          let datos = this.utilserv.GetLocalStorage('user');
          this.loginauth.redireccion(datos)
          resolve(false);
        }

      })

    });
  }

}
