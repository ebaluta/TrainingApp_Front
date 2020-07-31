import { Router } from '@angular/router';
import { TrainingsService } from './../../_services/trainings.service';
import { TokenStorageService } from './../../_services/token-storage.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-trainings',
  templateUrl: './trainings.component.html',
  styleUrls: ['./trainings.component.css'],
})
export class TrainingsComponent implements OnInit {
  trainings: any[];
  errorMessage: string;

  constructor(
    private trainingService: TrainingsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getUserContent();
  }

  getUserContent() {
    this.trainingService.getUserContent().subscribe(
      (data) => {
        this.trainings = JSON.parse(data);
      },
      (err) => (this.errorMessage = err.error.message)
    );
  }

  addTraining() {
    this.router.navigate(['/trainings/add']);
  }
}
