import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  formRegistration = new FormGroup({});

  constructor(    
    private formBuilder: FormBuilder,
    protected httpClient: HttpClient,
    private toast: HotToastService,
    protected router:Router) { }

  ngOnInit(): void {
    this.formRegistration = this.formBuilder.group({
      name: new FormControl('', Validators.required),
      userName: new FormControl('', Validators.required),
      gender: new FormControl('', Validators.required),
      birthdate: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
      phone_number: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }


  register = () =>{
    
    console.log('ejecutando register');

    var userData = {
      "name": this.formRegistration?.get('name')?.value,
      "userName": this.formRegistration?.get('userName')?.value,
      "gender": this.formRegistration?.get('gender')?.value,
      "birthdate": this.formRegistration?.get('birthdate')?.value,
      "address": this.formRegistration?.get('address')?.value,
      "phone_number": this.formRegistration?.get('phone_number')?.value,
      "email": this.formRegistration?.get('email')?.value,
      "password": this.formRegistration?.get('password')?.value,
    }

    let res: Observable<any> = this.httpClient
      .post('http://localhost:4300/api/signup', {
        userData,
      })
      // .pipe(share())
      ;
    res.subscribe(
      (res) => {
        console.log("Llega res")
        console.log(res)
        this.toast.success( "Registro exitoso, por favor confirme su email", {
          duration: 5000,
          position: 'top-center'
        });
        setTimeout(() => {
          this.router.navigate(['/']);
        }, 1000);
      },
      (error) => {
        console.log(error.error.error);
        this.toast.error( error.error.error, {
          duration: 2000,
          position: 'top-center'
        });
      }
    );

    console.log(userData);
    return userData;
  }

  goToLogin = () => {
    this.router.navigate(['/login']);
  }
}
