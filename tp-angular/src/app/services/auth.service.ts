import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';
import { HotToastService } from '@ngneat/hot-toast';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private toast: HotToastService) {}

  private isLoggedSource = new Subject<boolean>();

  isLogged$ = this.isLoggedSource.asObservable();

  changeLoggedStatus(loggedState: boolean) {
    this.isLoggedSource.next(loggedState);
  }

  isLogged() {
    var accesToken = localStorage.getItem('accesToken');
    if (accesToken) {
      var accesTokenDecoded: any = jwt_decode(accesToken);
      var expiration = accesTokenDecoded.exp;
      if (expiration - Date.now() / 1000 < 0) {
        this.toast.error('Sesión expirada, por favor ingrese nuevamente', {
          duration: 1500,
          position: 'top-center',
        });
        localStorage.removeItem('accesToken');
        localStorage.removeItem('idToken');
        localStorage.removeItem('products');
        this.changeLoggedStatus(false);
        return false;
      }

      this.changeLoggedStatus(true);
        return true;
      } else {
      this.changeLoggedStatus(false);
      return false;
    }
  }
}
