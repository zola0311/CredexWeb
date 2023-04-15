import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusesAddDialogComponent } from './statuses-add-dialog.component';

describe('StatusesAddDialogComponent', () => {
  let component: StatusesAddDialogComponent;
  let fixture: ComponentFixture<StatusesAddDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatusesAddDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatusesAddDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
