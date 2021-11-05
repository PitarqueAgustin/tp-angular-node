import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor() { }

  products : any = {};

  total : number = 0.0;

  ngOnInit(): void {
    let products = window.localStorage.getItem("products");
    this.products = JSON.parse(products?products:"[]");
    this.products.forEach((p: { price: string; quantity: number;}) => {
      this.total += parseInt(p.price) * p.quantity;
    });
  } 

  deleteCart = ()=>{
    window.localStorage.setItem("cart","0");
    window.localStorage.setItem("products","");
    let cart = document.querySelector('#cart');
    cart?.setAttribute('data-content',"0");
    window.location.href = "/cart";
  }

  pay = ()=>{
    alert("No esta hecha esa funcionalidad :(");
  }

}
