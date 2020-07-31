import { PlanServiceService } from './../../_services/plan-service.service';
import { TrainingDay } from './../../models/training-day';
import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef,
  Input,
} from '@angular/core';

// const days : String [] = [
//   'Mon',
//   'Tue',
//   'Wed',
//   'Thu',
//   'Fri',
//   'Sat',
//   'Sun'
// ]

@Component({
  selector: 'app-plans',
  // changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.css'],
})
export class PlansComponent implements OnInit {
  @Input() trainings: TrainingDay[];

  isSaved: boolean = false;

  errorMessage: String;

  constructor(private planService: PlanServiceService) {}

  ngOnInit(): void {
    this.getTrainings();
  }

  getTrainings() {
    this.planService.getUserTrainings().subscribe(
      (data) => {
        this.trainings = JSON.parse(data);
      },
      (err) => (this.errorMessage = err.error.message)
    );
  }

  savePlan() {
    for (let i = 0; i < this.trainings.length; i++) {
      this.change(this.trainings[i]);
    }

    this.isSaved = !this.isSaved;
  }

  edit() {
    this.isSaved = !this.isSaved;
  }

  change(training) {
    this.planService.changeTraining(training).subscribe();
  }
}
