import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbsenceTypeAddDialogComponent } from './absence-type-add-dialog.component';

describe('AbsenceTypeAddDialogComponent', () => {
  let component: AbsenceTypeAddDialogComponent;
  let fixture: ComponentFixture<AbsenceTypeAddDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AbsenceTypeAddDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AbsenceTypeAddDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
