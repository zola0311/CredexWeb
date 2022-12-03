import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeAddDialogComponent } from './employee-add-dialog.component';

describe('EmployeeAddDialogComponent', () => {
  let component: EmployeeAddDialogComponent;
  let fixture: ComponentFixture<EmployeeAddDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeAddDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeAddDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
