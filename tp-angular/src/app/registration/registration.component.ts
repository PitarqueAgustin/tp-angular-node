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
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent implements OnInit {
  formRegistration = new FormGroup({});

  constructor(
    private formBuilder: FormBuilder,
    protected httpClient: HttpClient,
    private toast: HotToastService,
    protected router: Router
  ) {}

  emailPattern: any = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  passwordPattern: any = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

  ngOnInit(): void {
    this.formRegistration = this.formBuilder.group({
      name: new FormControl('', [Validators.required, Validators.minLength(2)]),
      userName: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
      ]),
      // gender: new FormControl('', Validators.required),
      // birthdate: new FormControl('', Validators.required),
      address: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
      ]),
      // phone_number: new FormControl('', Validators.required),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(this.emailPattern),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern(this.passwordPattern),
      ]),
    });
  }

  register = () => {
    if (this.formRegistration.valid) {
      var userData = {
        name: this.formRegistration?.get('name')?.value,
        userName: this.formRegistration?.get('userName')?.value,
        // "gender": this.formRegistration?.get('gender')?.value,
        // "birthdate": this.formRegistration?.get('birthdate')?.value,
        address: this.formRegistration?.get('address')?.value,
        // "phone_number": this.formRegistration?.get('phone_number')?.value,
        email: this.formRegistration?.get('email')?.value,
        password: this.formRegistration?.get('password')?.value,
      };

      let res: Observable<any> = this.httpClient.post(
        'http://localhost:4300/api/signup',
        {
          userData,
        }
      );
      // .pipe(share())
      res.subscribe(
        (res) => {
          this.toast.success('Registro exitoso, por favor confirme su email', {
            duration: 5000,
            position: 'top-center',
          });
          setTimeout(() => {
            this.router.navigate(['/']);
          }, 1000);
        },
        (error) => {
          console.log('error res', error);
          this.toast.error(error.error.error, {
            duration: 2000,
            position: 'top-center',
          });
        }
      );

      console.log(userData);
      return userData;
    } else {
      this.toast.error('Complete todos los campos correctamente antes de enviar', {
        duration: 2000,
        position: 'top-center',
      });
      return false;
    }
  };

  goToLogin = () => {
    this.router.navigate(['/login']);
  };

  get name() {
    console.log(this.formRegistration?.get('name')?.value);
    return this.formRegistration?.get('name');
  }
  get userName() {
    return this.formRegistration?.get('userName');
  }
  get address() {
    return this.formRegistration?.get('address');
  }
  get email() {
    return this.formRegistration?.get('email');
  }
  get password() {
    return this.formRegistration?.get('password');
  }
}
