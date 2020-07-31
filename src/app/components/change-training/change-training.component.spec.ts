import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeTrainingComponent } from './change-training.component';

describe('ChangeTrainingComponent', () => {
  let component: ChangeTrainingComponent;
  let fixture: ComponentFixture<ChangeTrainingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeTrainingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeTrainingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
