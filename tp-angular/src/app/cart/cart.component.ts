import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { share } from 'rxjs/operators';
import { Ticket } from '../response';
import { HotToastService } from '@ngneat/hot-toast';
import { faTrash, faSadTear } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor(protected router:Router, protected httpClient: HttpClient, private toast: HotToastService) {
    console.log('viewdemo constructor');
  }

  faTrash = faTrash;
  faSadTear = faSadTear;

  products : any = {};

  total : number = 0.0;

  ngOnInit(): void {
    let products = window.localStorage.getItem("products");
    this.products = JSON.parse(products?products:"[]");
    this.products.forEach((p: { price: string; quantity: number;}) => {
      this.total += parseInt(p.price) * p.quantity;
    });
  }

  cart = document.querySelector('#cart');

  deleteCart = ()=>{
    window.localStorage.setItem("cart","0");
    window.localStorage.setItem("products","");
    this.cart?.setAttribute('data-content',"0");
    this.total = 0.0;
    this.products = [];
  }

  pay = ()=>{
    let obj = {
      products : this.products,
      total: this.total
    };
    let res: Observable<Ticket[]> =
        this.httpClient.post<Ticket[]>('http://localhost:4300/api/buy', obj)
        .pipe(share());
        //.pipe(catchError(this.handleError));
      res.subscribe(
          value=> {
            this.toast.success('Compra completada!',{
              duration: 3000,
              position: 'bottom-right'
            });
            console.log('sucess',value);
            this.deleteCart();
          },
          error => {
            this.toast.error('Ocurrio un error',{
              duration: 3000,
              position: 'bottom-right'
            });
            console.error(error);
          }
      );
  }

  deleteProd = (idProd : String)=>{
    let prodDelete = this.products.find((p: { _id: String; })=> p._id == idProd);
    let index = this.products.indexOf(prodDelete);
    if(prodDelete.quantity > 1){
      this.products[index].quantity = this.products[index].quantity - 1;
    }else{
      this.products.splice(index,1);
    }
    this.total = this.total - prodDelete.price;
    let count = window.localStorage.getItem("cart");
    window.localStorage.setItem("products", JSON.stringify(this.products));
    window.localStorage.setItem("cart",count? (parseInt(count) - 1).toString() : "0");
    this.cart?.setAttribute('data-content',count?(parseInt(count) - 1).toString():"0");
    this.toast.error(`Se elimino el producto ${prodDelete.name}`,{
      duration: 2000,
      position: 'top-center'
    });
  }

}
