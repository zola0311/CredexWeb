import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AddStatusesInterface } from 'src/app/interfaces/add-statuses-interface';
import { Statuses } from 'src/app/models/statusesModel/statuses.model';

@Component({
  selector: 'app-statuses-add-dialog',
  templateUrl: './statuses-add-dialog.component.html',
  styleUrls: ['./statuses-add-dialog.component.scss'],
})
export class StatusesAddDialogComponent implements OnInit {
  form: FormGroup;
  status: Statuses = {
    id: 0,
    name: null,
    employees: null,
  };
  constructor(
    private formBuilder: FormBuilder,
    private addStatusesDialogRef: MatDialogRef<StatusesAddDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AddStatusesInterface
  ) {
    this.form = this.formBuilder.group({
      name: [null, Validators.required],
    });
  }

  get getControl() {
    return this.form.controls;
  }

  ngOnInit(): void {}

  addStatuses(): void {
    if(this.form.valid) {
      this.status.name = this.form.controls.name.value;
      this.data.status = this.status;
      this.closeStatusesDialog();
    }
  }

  closeStatusesDialog() {
    this.addStatusesDialogRef.close(this.data);
  }
}
