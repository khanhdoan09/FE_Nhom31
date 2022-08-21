import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {ContactTo} from "../contact-to";

@Injectable({
  providedIn: 'root'
})
export class NotRouteLoginGuard implements CanActivate {
  constructor(private router: Router) {
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (ContactTo.isLogin == true) {
      return this.router.parseUrl('home');
    }
    else {
      return true;
    }
  }

}
