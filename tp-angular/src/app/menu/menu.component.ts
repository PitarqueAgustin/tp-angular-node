import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.setActiveLink();
    this.setCountCart();
  }

  setActiveLink = () =>{
    let url = window.location.href.replace("http://localhost:4200","");

    let cartLink = document.querySelector('#cart_link');
    let prodLink = document.querySelector('#prod_link');

    cartLink?.classList.remove('activo');
    prodLink?.classList.remove('activo');
    
    switch(url)
    {
      case '/':
        prodLink?.classList.add('activo');
      break;
      case '/cart':
        cartLink?.classList.add('activo');
      break;
      default:
        prodLink?.classList.add('activo');
      break;  
    }

  }

  setCountCart = ()=>{
    let cart = document.querySelector('#cart');
    let count = window.localStorage.getItem("cart");
    cart?.setAttribute('data-content',count?count:"0");
  }

}
