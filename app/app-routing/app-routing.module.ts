import { CustomerBaseComponent } from './../pages/customer-base/customer-base.component';
import { LoginComponent } from './../pages/login/login.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CustomerQueueComponent } from './../pages/customer-queue/customer-queue.component';
import { CustomerRegistrationComponent } from './../pages/customer-registration/customer-registration.component';

 
@NgModule({
  imports: [
    RouterModule.forRoot([
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: LoginComponent },
      { path: 'dashboard', component: CustomerQueueComponent },
      { path: 'customer', component: CustomerBaseComponent },
      { path: 'customers', component: CustomerQueueComponent },
      { path: 'registration/:key', component: CustomerRegistrationComponent },
    ])
  ],
  declarations: [],
  exports: [ RouterModule]
})
export class AppRoutingModule { }