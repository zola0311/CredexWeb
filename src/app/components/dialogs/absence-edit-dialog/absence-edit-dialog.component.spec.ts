import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbsenceEditDialogComponent } from './absence-edit-dialog.component';

describe('AbsenceEditDialogComponent', () => {
  let component: AbsenceEditDialogComponent;
  let fixture: ComponentFixture<AbsenceEditDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AbsenceEditDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AbsenceEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
