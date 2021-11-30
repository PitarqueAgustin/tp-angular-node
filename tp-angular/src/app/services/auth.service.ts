import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor() { }

  isLogged(){
    // var accesToken = localStorage.getItem("accesToken"); 
    // if (accesToken){
    //   var accesTokenDecoded:any = jwt_decode(accesToken);
    //   var expiration = accesTokenDecoded.exp;
    //   if(true){
    //     console.log(expiration)
    //   }
    // }
    return true;
  }
}