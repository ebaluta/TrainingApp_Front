import { Observable } from 'rxjs';
import { TokenStorageService } from './token-storage.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const TRAIN_API = 'http://localhost:8080/api/trainings';

@Injectable({
  providedIn: 'root',
})
export class TrainingsService {
  username = this.tokenStorage.getUser().username;

  header = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  constructor(
    private httpClient: HttpClient,
    private tokenStorage: TokenStorageService
  ) {}

  // getToken(): string {
  //   const fullToken= JSON.parse(this.tokenStorage.getToken());
  //   const authToken= 'Bearer ' + fullToken.token;
  //   return authToken;
  // }

  getPublicContent(): Observable<any> {
    return this.httpClient.get(`${TRAIN_API}/all`, {
      headers: this.header,
      responseType: 'text',
    });
  }

  getUserContent(): Observable<any> {
    return this.httpClient.get(`${TRAIN_API}/${this.username}/training`, {
      headers: this.header,
      responseType: 'text',
    });
  }

  addTraining(form): Observable<any> {
    const token = this.tokenStorage.getToken();
    const authToken = JSON.parse(token).token;

    return this.httpClient.post(
      `${TRAIN_API}/user/add`,
      {
        date: form.date,
        distance: form.distance,
        duration: form.duration,
        description: form.description,
        username: this.username,
      },
      {
        headers: this.header,
        responseType: 'text',
      }
    );
  }

  updateTraining(body): Observable<any> {
    const token = this.tokenStorage.getToken();
    const authToken = JSON.parse(token).token;

    const headerWithUsername = this.header.append('Username', this.username);

    return this.httpClient.post(
      `${TRAIN_API}/user/update/${body.id}`,
      {
        date: body.date,
        distance: body.distance,
        duration: body.duration,
        description: body.description,
        username: this.username,
      },
      {
        headers: headerWithUsername,
        responseType: 'text',
      }
    );
  }

  getDistinctTraining(id: number): Observable<any> {
    return this.httpClient.get(`${TRAIN_API}/${id}`, {
      headers: this.header,
      responseType: 'text',
    });
  }
}
