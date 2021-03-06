import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router:Router, private authService:AuthService){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):  boolean {

    if (!this.authService.isLogged()) {
      // Si la hora es mayor o igual redireccionamos al homeComponent
      this.router.navigate(['login']);
      // Si devolvemos FALSE no de permitirá el acceso
      return false;
    }

    return true;
  }
  
}