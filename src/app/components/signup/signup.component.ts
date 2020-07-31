import { NoWhiteSpaceValidator } from './../../models/NoWhiteSpaceValidator';
import { PlanServiceService } from './../../_services/plan-service.service';
import { AuthService } from './../../_services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  errorMessage: string;
  isSuccessfull = false;
  isSignUpFailed = false;
  passwordShown = false;
  confirmedPasswordShown = false;

  form = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(20),
      NoWhiteSpaceValidator.cannotContainsWhiteSpace,
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.email,
      NoWhiteSpaceValidator.cannotContainsWhiteSpace,
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(20),
      Validators.pattern('.*[A-Z].*'),
      Validators.pattern('.*[`~!@#$%^&*()\\-_=+\\\\|\\[{\\]};:\'",<.>/?].*'),
      Validators.pattern('.*[0-9].*'),
      NoWhiteSpaceValidator.cannotContainsWhiteSpace,
    ]),
    confirmPassword: new FormControl('', Validators.required),
  });

  constructor(
    private authService: AuthService,
    private planService: PlanServiceService
  ) {}

  ngOnInit(): void {}

  get username() {
    return this.form.get('username');
  }

  get password() {
    return this.form.get('password');
  }

  get email() {
    return this.form.get('email');
  }

  get confirmPassword() {
    return this.form.get('confirmPassword');
  }

  signUp() {
    this.authService.register(this.form).subscribe(
      (data) => {
        this.isSuccessfull = true;
        this.isSignUpFailed = false;
      },
      (err) => {
        this.errorMessage = JSON.parse(err).error;
        this.isSignUpFailed = true;
      }
    );

    this.createPlan(this.username.value);
  }

  createPlan(username) {
    this.planService.createUsersTrainings(username).subscribe();
  }

  showPassword() {
    this.passwordShown = !this.passwordShown;
  }

  showConfirmedPassword() {
    this.confirmedPasswordShown = !this.confirmedPasswordShown;
  }
}
