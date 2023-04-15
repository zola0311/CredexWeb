import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbsenceTypeEditDialogComponent } from './absence-type-edit-dialog.component';

describe('AbsenceTypeEditDialogComponent', () => {
  let component: AbsenceTypeEditDialogComponent;
  let fixture: ComponentFixture<AbsenceTypeEditDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AbsenceTypeEditDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AbsenceTypeEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
