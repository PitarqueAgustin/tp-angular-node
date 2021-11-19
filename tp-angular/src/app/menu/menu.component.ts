import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.setCountCart();
  }

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
