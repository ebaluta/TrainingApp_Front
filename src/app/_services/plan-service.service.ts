import { TrainingDay } from './../models/training-day';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { TokenStorageService } from './token-storage.service';

const TRAIN_API = 'http://localhost:8080/api/plan';

@Injectable({
  providedIn: 'root',
})
export class PlanServiceService {
  header = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  constructor(
    private httpClient: HttpClient,
    private tokenStorage: TokenStorageService
  ) {}

  getUserTrainings(): Observable<any> {
    let username = this.tokenStorage.getUser().username;

    let newHeader = this.header.set('Username', username);

    return this.httpClient.get(`${TRAIN_API}/${username}/all`, {
      headers: newHeader,
      responseType: 'text',
    });
  }

  createUsersTrainings(username: string) {
    let newHeader = this.header.set('Username', username);

    return this.httpClient.get(`${TRAIN_API}/create`, {
      headers: newHeader,
      responseType: 'text',
    });
  }

  changeTraining(training: TrainingDay) {
    let username = this.tokenStorage.getUser().username;
    let newHeader = this.header.set('Username', username);

    return this.httpClient.post(
      `${TRAIN_API}/update`,
      {
        username: username,
        day: training.day,
        duration: training.duration,
        description: training.description,
        distance: training.distance,
      },
      {
        headers: newHeader,
        responseType: 'text',
      }
    );
  }
}
