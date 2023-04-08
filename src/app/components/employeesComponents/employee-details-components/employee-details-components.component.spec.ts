import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeDetailsComponentsComponent } from './employee-details-components.component';

describe('EmployeeDetailsComponentsComponent', () => {
  let component: EmployeeDetailsComponentsComponent;
  let fixture: ComponentFixture<EmployeeDetailsComponentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeDetailsComponentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeDetailsComponentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
