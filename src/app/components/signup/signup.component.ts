import { AuthService } from './../../_services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  errorMessage: string;
  isSuccessfull = false;
  isSignUpFailed=false;

  form= new FormGroup({
    username: new FormControl('',
                              [ Validators.required,
                                Validators.minLength(6),
                                Validators.maxLength(20)]),
    email: new FormControl('',[
                          Validators.required,
                          Validators.email]),
    password: new FormControl('', [
                          Validators.required,
                          Validators.minLength(6),
                          Validators.maxLength(20),
                          Validators.pattern(".*[A-Z].*"),
                          Validators.pattern(".*[`~!@#$%^&*()\\-_=+\\\\|\\[{\\]};:'\",<.>/?].*"),
                          Validators.pattern(".*[0-9].*")
                          ]),
    confirmPassword: new FormControl('', Validators.required)
  })

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
  }

  get username(){
    return this.form.get('username');
  }

  get password(){
    return this.form.get('password');
  }

  get email(){
    return this.form.get('email');
  }

  get confirmPassword(){
    return this.form.get('confirmPassword');
  }


  signUp(){
    this.authService.register(this.form).subscribe(
      data => {
        this.isSuccessfull=true;
        this.isSignUpFailed=false;
        console.log(this.isSuccessfull);
      },
      err => {
         this.errorMessage=JSON.parse(err).error;
        this.isSignUpFailed=true;
      }
    )
  }

}
