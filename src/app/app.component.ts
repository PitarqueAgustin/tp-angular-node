import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { share, catchError } from 'rxjs/operators';

//Import interface
import { Response } from './response';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  title = 'Hard Shop';

  data : Response[] = [];

  constructor(protected router:Router, protected httpClient: HttpClient) { 
    console.log('viewdemo constructor');
  }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts = ()=>{

    let res: Observable<Response[]> =
        this.httpClient.get<Response[]>('http://localhost:4300/products')
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
