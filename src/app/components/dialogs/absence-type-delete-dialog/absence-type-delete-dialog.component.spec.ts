import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbsenceTypeDeleteDialogComponent } from './absence-type-delete-dialog.component';

describe('AbsenceTypeDeleteDialogComponent', () => {
  let component: AbsenceTypeDeleteDialogComponent;
  let fixture: ComponentFixture<AbsenceTypeDeleteDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AbsenceTypeDeleteDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AbsenceTypeDeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
