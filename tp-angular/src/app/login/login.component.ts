import { Component, OnInit, ViewChild, AfterViewInit  } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { share, catchError } from 'rxjs/operators';
import { HotToastService } from '@ngneat/hot-toast';

//Import interface
import { Product } from '../response';

//Import Component
import { ProductComponent } from '../product/product.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor() {
    console.log('viewdemo constructor');
  }

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

}
