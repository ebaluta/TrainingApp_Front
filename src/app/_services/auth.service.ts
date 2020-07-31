import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

const AUTH_API = 'http://localhost:8080/api/auth';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(credentials): Observable<any> {
    return this.http.post(
      `${AUTH_API}/signin`,
      {
        username: credentials.get('username').value,
        password: credentials.get('password').value,
      },
      httpOptions
    );
  }

  register(form): Observable<any> {
    return this.http.post(
      `${AUTH_API}/signup`,
      {
        username: form.get('username').value,
        email: form.get('email').value,
        password: form.get('password').value,
      },
      httpOptions
    );
  }
}
