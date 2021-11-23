import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  // Ya que vamos a hacer un redirección si la hora es mayor de 22
  // Necesitamos importar el Router e inyectarlo al construictor
  constructor(private router:Router, private authService:AuthService){}


  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):  boolean {

    // Obtenemos la hora actual  
    const hora = new Date().getHours();
    
    // Comparamos la hora con el maximo permitido
    // Esto sería en caso de que no queremos que 
    // pueda entrar a la página después de las 10:00 pm  
    if (!this.authService.isLogged()) {
      // Si la hora es mayor o igual redireccionamos al homeComponent
      this.router.navigate(['login']);
      // Si devolvemos FALSE no de permitirá el acceso
      return false;
    }

    // Si devolvemos TRUE si se permitirá el acceso.
    return true;
  }
  
}