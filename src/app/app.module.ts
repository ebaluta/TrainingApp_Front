import { FlatpickrModule } from 'angularx-flatpickr';

import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { MatRippleModule, MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';

import { authInterceptorProvider } from './_helpers/auth.interceptor';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { from } from 'rxjs';
import { SigninComponent } from './components/signin/signin.component';
import { SignoutComponent } from './components/signout/signout.component';
import { HomeComponent } from './components/home/home.component';
import { SignupComponent } from './components/signup/signup.component';
import { ValidateEqualModule } from 'ng-validate-equal';
import { UserComponent } from './components/user/user.component';
import { TrainingsComponent } from './components/trainings/trainings.component';
import { PlansComponent } from './components/plans/plans.component';
import { AddTrainingComponent } from './components/add-training/add-training.component';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { DatePipe, CommonModule } from '@angular/common';
import { ChangeTrainingComponent } from './components/change-training/change-training.component';


@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    SignoutComponent,
    HomeComponent,
    SignupComponent,
    UserComponent,
    TrainingsComponent,
    PlansComponent,
    AddTrainingComponent,
    ChangeTrainingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    ValidateEqualModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule,
    MatDatepickerModule,
    MatNativeDateModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    CommonModule,
    FormsModule,
    NgbModalModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
    FlatpickrModule

  ],
  exports: [
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule,
    MatDatepickerModule,
    AddTrainingComponent
  ],
  providers: [
    authInterceptorProvider,
    MatDatepickerModule,
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
