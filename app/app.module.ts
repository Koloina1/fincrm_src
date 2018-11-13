import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularDraggableModule } from 'angular2-draggable';
import { ArchwizardModule } from 'angular-archwizard';
import { AppComponent } from './app.component';
import { ReactiveFormsModule, FormsModule  } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CommonModule, DatePipe } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule, MatSortModule, MatPaginatorModule } from '@angular/material'
import { ToastrModule, ToastContainerModule  } from 'ngx-toastr';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { ContentComponent } from './layout/content/content.component';
import { CustomerBaseComponent } from './pages/customer-base/customer-base.component';
import { LoginComponent } from './pages/login/login.component';
import { environment } from '../environments/environment';
import { CustomerService } from './services/customer/customer.service';
import { IndividualService } from './services/orchid/individual.service';
import { CustomerOrchService } from './services/orchid/customer-orch.service';
import { AuthService } from './services/auth/auth.service';
import { CustomerQueueComponent } from './pages/customer-queue/customer-queue.component';
import { CustomerRegistrationComponent } from './pages/customer-registration/customer-registration.component';
import { FieldErrorDisplayComponent } from './pages/field-error-display/field-error-display.component';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { HttpClientModule } from '@angular/common/http';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgFlashMessagesModule } from 'ng-flash-messages';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    ContentComponent,
    CustomerBaseComponent,
    LoginComponent,
    CustomerQueueComponent,
    CustomerRegistrationComponent,
    FieldErrorDisplayComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    AngularDraggableModule,
    AngularFireAuthModule,
    ArchwizardModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    CommonModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({ positionClass: 'inline' }),
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    HttpClientModule,
    NgxSpinnerModule,
    NgFlashMessagesModule.forRoot(),
    ToastContainerModule

  ],
  providers: [CustomerService, AuthService, DatePipe, IndividualService, CustomerOrchService],
  bootstrap: [AppComponent]
})
export class AppModule { }
