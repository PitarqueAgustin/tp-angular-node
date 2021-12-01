import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { ProductComponent } from './product/product.component';

import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CartComponent } from './cart/cart.component';
import { HotToastModule } from '@ngneat/hot-toast';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './guard/auth.guard';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Auth2Guard } from './guard/auth2.guard';
import { RegistrationComponent } from './registration/registration.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'cart', component: CartComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent, canActivate: [Auth2Guard] },
  { path: 'registration', component: RegistrationComponent, canActivate: [Auth2Guard] },
];

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    ProductComponent,
    HomeComponent,
    CartComponent,
    LoginComponent,
    RegistrationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    HotToastModule.forRoot(),
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
