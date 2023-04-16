import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EditJobInterface } from 'src/app/interfaces/edit-jobs-interface';
import { Jobs } from 'src/app/models/jobsModel/jobs.model';

@Component({
  selector: 'app-job-edit-dialog',
  templateUrl: './job-edit-dialog.component.html',
  styleUrls: ['./job-edit-dialog.component.scss']
})
export class JobEditDialogComponent implements OnInit {
  form: FormGroup;
  job: Jobs = {
    id: 0,
    name: null,
    employees: null,
  };
  constructor(
    private formBuilder: FormBuilder,
    private editJobDialogRef: MatDialogRef<JobEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: EditJobInterface
  ) {
    this.form = this.formBuilder.group({
      name: [null, Validators.required],
    });
   }

   get getControl() {
    return this.form.controls;
  }

  ngOnInit(): void {
    this.fillForm();
  }

  updateJob(): void {
    if(this.form.valid) {
      this.job.id = this.data.job.id;
      this.job.name = this.form.controls.name.value;
      this.data.editFormSubmitted = true;
      this.data.job = this.job;
      this.closeJobDialog();
    }
  }

  fillForm(): void {
    this.form.controls.name.patchValue(this.data.job.name);
  }

  closeJobDialog() {
    this.editJobDialogRef.close(this.data);
  }

}
