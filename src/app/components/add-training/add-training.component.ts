import { TokenStorageService } from './../../_services/token-storage.service';
import { TrainingsService } from './../../_services/trainings.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-training',
  templateUrl: './add-training.component.html',
  styleUrls: ['./add-training.component.css'],
})
export class AddTrainingComponent implements OnInit {
  form = new FormGroup({
    date: new FormControl('', Validators.required),
    distance: new FormControl('', [
      Validators.required,
      Validators.pattern('[0-9]+(.[0-9][0-9]?)?'),
    ]),
    duration: new FormControl('', [
      Validators.required,
      Validators.pattern('[0-9]+(.[0-9][0-9]?)?'),
    ]),
    description: new FormControl(),
  });

  isSuccessfull = false;
  errorMessage: string;

  maxDate = new Date(Date.now() + 1);

  constructor(
    private datePipe: DatePipe,
    private trainingService: TrainingsService,
    private tokenStorae: TokenStorageService
  ) {}

  ngOnInit(): void {}

  save() {
    const token = this.tokenStorae.getToken();
    const token2 = JSON.parse(token);

    const body = this.form.value;
    body.date = this.datePipe.transform(body.date, 'yyyy-MM-dd');
    this.trainingService.addTraining(body).subscribe(
      (data) => {
        this.isSuccessfull = true;
        console.log(this.form.value);
      },
      (err) => {
        this.errorMessage = err.error.message;
      }
    );
  }

  next() {
    this.isSuccessfull = false;
    window.location.reload();
  }

  display() {
    console.log(this.form.get('date').value);
  }

  get date() {
    return this.form.get('date');
  }

  get distance() {
    return this.form.get('distance');
  }

  get duration() {
    return this.form.get('duration');
  }

  get description() {
    return this.form.get('description');
  }
}
