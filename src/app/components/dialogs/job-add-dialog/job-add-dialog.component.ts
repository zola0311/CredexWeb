import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AddJobInterface } from 'src/app/interfaces/add-jobs-interface';
import { Jobs } from 'src/app/models/jobsModel/jobs.model';

@Component({
  selector: 'app-job-add-dialog',
  templateUrl: './job-add-dialog.component.html',
  styleUrls: ['./job-add-dialog.component.scss']
})
export class JobAddDialogComponent implements OnInit {
  form: FormGroup;
  job: Jobs = {
    id: 0,
    name: null,
    employees: null,
  };
  constructor(
    private formBuilder: FormBuilder,
    private addJobsDialogRef: MatDialogRef<JobAddDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AddJobInterface
  ) {
    this.form = this.formBuilder.group({
      name: [null, Validators.required],
    });
   }

  ngOnInit(): void {
  }

  addJob(): void {
    if(this.form.valid) {
      this.job.name = this.form.controls.name.value;
      this.data.job = this.job;
      this.closeStatusesDialog();
    }
  }

  get getControl() {
    return this.form.controls;
  }

  closeStatusesDialog() {
    this.addJobsDialogRef.close(this.data);
  }

}
