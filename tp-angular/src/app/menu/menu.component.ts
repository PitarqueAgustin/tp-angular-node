import { Component, OnInit } from '@angular/core';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  isLogged:boolean = false;

  constructor(
    private authService:AuthService
  ) {}

  ngOnInit(): void {
    let url = window.location.href.replace("http://localhost:4200","");
    this.setActiveLink(url);
    this.setCountCart();
    this.isLogged = this.authService.isLogged();
  }

  faShoppingCart = faShoppingCart;

  setActiveLink = (url: String) =>{
    let linkProd = document.querySelector('#linkProd');
    let linkCart = document.querySelector('#linkCart');

    linkProd?.classList.remove('activo');
    linkCart?.classList.remove('activo');

    switch(url){
        case '/':
          linkProd?.classList.add('activo');
        break;
        case '/cart':
          linkCart?.classList.add('activo');
        break;
      }
  }

  setCountCart = ()=>{
    let cart = document.querySelector('#cart');
    let count = window.localStorage.getItem("cart");
    cart?.setAttribute('data-content',count?count:"0");
  }

}
