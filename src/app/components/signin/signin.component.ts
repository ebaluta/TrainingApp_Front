import { TokenStorageService } from './../../_services/token-storage.service';
import { AuthService } from './../../_services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent implements OnInit {
  invalidLogin: boolean;
  isLoggedIn = false;
  errorMessage: string;
  isPasswordShown = false;

  form = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  constructor(
    private authService: AuthService,
    private tokenStorage: TokenStorageService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
    }
  }

  signIn() {
    this.authService.login(this.form).subscribe(
      (data) => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);

        this.invalidLogin = false;
        this.isLoggedIn = true;

        window.location.reload();
      },
      (err) => {
        this.errorMessage = err.error.message;
        this.invalidLogin = true;
      }
    );
  }

  get username() {
    return this.form.get('username');
  }

  get password() {
    return this.form.get('password');
  }


  showPassword() {
    this.isPasswordShown = !this.isPasswordShown;
  }
}
