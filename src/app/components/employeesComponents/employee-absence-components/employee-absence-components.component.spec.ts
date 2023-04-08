import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeAbsenceComponentsComponent } from './employee-absence-components.component';

describe('EmployeeAbsenceComponentsComponent', () => {
  let component: EmployeeAbsenceComponentsComponent;
  let fixture: ComponentFixture<EmployeeAbsenceComponentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeAbsenceComponentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeAbsenceComponentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
