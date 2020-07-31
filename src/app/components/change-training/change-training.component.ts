import { TrainingData } from './../../models/training-data';
import { TrainingsService } from './../../_services/trainings.service';
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-change-training',
  templateUrl: './change-training.component.html',
  styleUrls: ['./change-training.component.css'],
})
export class ChangeTrainingComponent implements OnInit {
  trainignAny: any;
  id: number;

  @Input() training: TrainingData;

  isSuccessfull = false;
  errorMessage: string;

  constructor(
    private route: ActivatedRoute,
    private trainingService: TrainingsService
  ) {}

  ngOnInit(): void {
    this.getTraining();
  }

  getTraining(): void {
    this.route.paramMap.subscribe((params) => (this.id = +params.get('id')));
    if (this.id != null) {
      this.trainingService.getDistinctTraining(this.id).subscribe((data) => {
        this.training = JSON.parse(data);
        console.log(this.training);
        console.log(this.training.date);
      });
    }
  }

  change() {
    this.trainingService.updateTraining(this.training).subscribe(
      (data) => {
        this.isSuccessfull = true;
      },
      (err) => {
        this.errorMessage = err.error.message;
      }
    );
  }
}
