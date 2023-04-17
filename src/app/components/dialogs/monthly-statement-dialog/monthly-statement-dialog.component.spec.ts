import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlyStatementDialogComponent } from './monthly-statement-dialog.component';

describe('MonthlyStatementDialogComponent', () => {
  let component: MonthlyStatementDialogComponent;
  let fixture: ComponentFixture<MonthlyStatementDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonthlyStatementDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthlyStatementDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
