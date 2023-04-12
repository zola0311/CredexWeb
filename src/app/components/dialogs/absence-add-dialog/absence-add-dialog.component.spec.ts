import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbsenceAddDialogComponent } from './absence-add-dialog.component';

describe('AbsenceAddDialogComponent', () => {
  let component: AbsenceAddDialogComponent;
  let fixture: ComponentFixture<AbsenceAddDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AbsenceAddDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AbsenceAddDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
