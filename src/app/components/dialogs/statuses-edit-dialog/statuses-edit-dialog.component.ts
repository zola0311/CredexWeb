import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EditStatusesInterface } from 'src/app/interfaces/edit-statuses-interface';
import { Statuses } from 'src/app/models/statusesModel/statuses.model';

@Component({
  selector: 'app-statuses-edit-dialog',
  templateUrl: './statuses-edit-dialog.component.html',
  styleUrls: ['./statuses-edit-dialog.component.scss']
})
export class StatusesEditDialogComponent implements OnInit {
  form: FormGroup;
  status: Statuses = {
    id: 0,
    name: null,
    employees: null,
  };
  constructor(
    private formBuilder: FormBuilder,
    private editStatusesDialogRef: MatDialogRef<StatusesEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: EditStatusesInterface
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

  updateStatus(): void {
    if(this.form.valid) {
      this.status.id = this.data.status.id;
      this.status.name = this.form.controls.name.value;
      this.data.editFormSubmitted = true;
      this.data.status = this.status;
      this.closeStatusesDialog();
    }
  }

  fillForm(): void {
    this.form.controls.name.patchValue(this.data.status.name);
  }

  closeStatusesDialog() {
    this.editStatusesDialogRef.close(this.data);
  }

}
