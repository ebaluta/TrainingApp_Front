import { Observable } from 'rxjs';
import { TokenStorageService } from './token-storage.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const AUTH_API='http://localhost:8080/api/trainings';





@Injectable({
  providedIn: 'root'
})
export class TrainingsService {

  header = new HttpHeaders({
    'Content-Type' : 'application/json',
  })

  constructor(
    private httpClient: HttpClient,
    private tokenStorage: TokenStorageService
  ) { }

  getToken(): string {
    const fullToken= JSON.parse(this.tokenStorage.getToken());
    const authToken= 'Bearer ' + fullToken.token;
    return authToken;
  }



  getPublicContent(): Observable<any>{
    return this.httpClient.get(`${AUTH_API}/all`,
    {
      headers: this.header,
      responseType: 'text'
    })
  }

  addTraining(form): Observable<any> {
    const token = this.tokenStorage.getToken();
    const authToken= JSON.parse(token).token;
    return this.httpClient.post(`${AUTH_API}/add`,
    {
      date: form.date,
      distance: form.distance,
      duration: form.duration,
      username: this.tokenStorage.getUser().username
    },{
      headers: this.header,
      responseType: 'text'
    })
  }
}
