import { Component, OnInit, ViewChild, AfterViewInit  } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { share, catchError } from 'rxjs/operators';

//Import interface
import { Product } from '../response';

//Import Component
import { ProductComponent } from '../product/product.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  title = 'Hard Shop';

  data : Product[] = [];

  cart : Product[] = [];

  constructor(protected router:Router, protected httpClient: HttpClient) {
    console.log('viewdemo constructor');
  }

  ngOnInit(): void {
    this.getProducts();
  }

  receiveProduct($event : Product) {
    this.addProductInCart($event);
  }

  addProductInCart = (prod : Product)=>{

    let prodExists = this.cart.find(p=> p._id == prod._id);

    if(prodExists){
      let index = this.cart.indexOf(prodExists);
      this.cart[index].quantity = this.cart[index].quantity.valueOf() + 1;
    }else{
      this.cart.push(prod);
    }

    window.localStorage.setItem("products", JSON.stringify(this.cart));
  }

  getProducts = ()=>{

    let res: Observable<Product[]> =
        this.httpClient.get<Product[]>('http://localhost:4300/api/products')
        .pipe(share());
        //.pipe(catchError(this.handleError));

      res.subscribe(
          value=> {
            this.data = value;
            console.log('data',this.data)
          },
          error => {
            console.log('ocurrio un error');
          }
      );

  }
}
