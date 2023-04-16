import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobDeleteDialogComponent } from './job-delete-dialog.component';

describe('JobDeleteDialogComponent', () => {
  let component: JobDeleteDialogComponent;
  let fixture: ComponentFixture<JobDeleteDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobDeleteDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobDeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
