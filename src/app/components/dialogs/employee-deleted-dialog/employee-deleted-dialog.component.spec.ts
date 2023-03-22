import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeDeletedDialogComponent } from './employee-deleted-dialog.component';

describe('EmployeeDeletedDialogComponent', () => {
  let component: EmployeeDeletedDialogComponent;
  let fixture: ComponentFixture<EmployeeDeletedDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeDeletedDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeDeletedDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
