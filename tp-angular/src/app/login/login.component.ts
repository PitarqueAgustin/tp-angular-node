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
import { Observable } from 'rxjs';
import { HotToastService } from '@ngneat/hot-toast';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  formLogin = new FormGroup({});

  constructor(
    private formBuilder: FormBuilder,
    protected httpClient: HttpClient,
    private toast: HotToastService,
    protected router: Router
  ) {}

  ngOnInit(): void {
    this.formLogin = this.formBuilder.group({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  goToRegistration = () => {
    this.router.navigate(['/registration']);
  };

  login() {
    if (this.formLogin.valid) {
      console.log('ejecutando signup');
      let res: Observable<any> = this.httpClient.post(
        'http://localhost:4300/api/login',
        {
          password: this.formLogin?.get('password')?.value,
          email: this.formLogin?.get('email')?.value,
        }
      );
      // .pipe(share())
      res.subscribe(
        (tokens) => {
          localStorage.setItem('idToken', tokens.idToken);
          localStorage.setItem('accesToken', tokens.accesToken);
          this.toast.success('Inicio de sesión exitoso', {
            duration: 1300,
            position: 'top-center',
          });
          setTimeout(() => {
            this.router.navigate(['/']);
          }, 1000);
        },
        (error) => {
          console.log(error.error.error);
          this.toast.error(error.error.error, {
            duration: 3000,
            position: 'top-center',
          });
        }
      );
    } else {
      this.toast.error('Complete todos los campos antes de enviar', {
        duration: 2000,
        position: 'top-center',
      });
    }
  }

  get email() {
    return this.formLogin?.get('email');
  }
  get password() {
    return this.formLogin?.get('password');
  }
}
