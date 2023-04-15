import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbsenceDeleteDialogComponent } from './absence-delete-dialog.component';

describe('AbsenceDeleteDialogComponent', () => {
  let component: AbsenceDeleteDialogComponent;
  let fixture: ComponentFixture<AbsenceDeleteDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AbsenceDeleteDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AbsenceDeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
