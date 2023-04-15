import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusesEditDialogComponent } from './statuses-edit-dialog.component';

describe('StatusesEditDialogComponent', () => {
  let component: StatusesEditDialogComponent;
  let fixture: ComponentFixture<StatusesEditDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatusesEditDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatusesEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
