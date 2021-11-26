import { Component, OnInit } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  formLogin = new FormGroup({});

  constructor(
    private formBuilder: FormBuilder,
    protected httpClient: HttpClient
  ) {}

  ngOnInit(): void {
    this.formLogin = this.formBuilder.group({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  login() {
    console.log('ejecutando signup');
    this.httpClient
      .post('http://localhost:4300/api/login', {
        password: this.formLogin?.get('password')?.value,
        email: this.formLogin?.get('email')?.value,
      })
      .subscribe((value: any) => {
        alert(JSON.stringify(value));
      },
      (error) => {
        console.log(error)
      });
  }
}
