import { ChangeTrainingComponent } from './components/change-training/change-training.component';
import { AddTrainingComponent } from './components/add-training/add-training.component';

import { AuthGuardService } from './_services/guards/auth-guard.service';
import { PlansComponent } from './components/plans/plans.component';
import { TrainingsComponent } from './components/trainings/trainings.component';
import { UserComponent } from './components/user/user.component';
import { SignupComponent } from './components/signup/signup.component';
import { HomeComponent } from './components/home/home.component';
import { SigninComponent } from './components/signin/signin.component';
import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'signin', component: SigninComponent},
  { path: 'signup', component: SignupComponent},
  { path: 'user', component: UserComponent},
  { path: 'trainings', component: TrainingsComponent, canActivate: [AuthGuardService]},
  { path: 'trainings/add', component: AddTrainingComponent },
  { path: 'plans', component: PlansComponent},
  { path: 'change/:id', component: ChangeTrainingComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
