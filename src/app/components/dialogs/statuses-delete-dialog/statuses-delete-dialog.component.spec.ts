import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusesDeleteDialogComponent } from './statuses-delete-dialog.component';

describe('StatusesDeleteDialogComponent', () => {
  let component: StatusesDeleteDialogComponent;
  let fixture: ComponentFixture<StatusesDeleteDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatusesDeleteDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatusesDeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
