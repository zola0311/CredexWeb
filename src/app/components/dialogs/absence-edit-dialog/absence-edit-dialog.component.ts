import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AbsencesTypes } from 'src/app/models/absencesTypesModel/absences-types.model';
import { AbsenceTypesService } from 'src/app/services/absenceTypesService/absence-types.service';
import { AbsencesOfEmployeesService } from 'src/app/services/absencesOfEmployeesService/absences-of-employees.service';
import { AbsenceAddDialogComponent } from '../absence-add-dialog/absence-add-dialog.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EditAbsenceInterface } from 'src/app/interfaces/edit-absence-interface';

@Component({
  selector: 'app-absence-edit-dialog',
  templateUrl: './absence-edit-dialog.component.html',
  styleUrls: ['./absence-edit-dialog.component.scss'],
})
export class AbsenceEditDialogComponent implements OnInit {
  form: FormGroup;
  submitted: boolean = false;
  absenceTypes: AbsencesTypes[];
  constructor(
    private formBuilder: FormBuilder,
    private absencesOfEmployeesService: AbsencesOfEmployeesService,
    private absenceTypesService: AbsenceTypesService,
    private addAbsenceDialogRef: MatDialogRef<AbsenceAddDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: EditAbsenceInterface
  ) {
    this.form = this.formBuilder.group({
      date: [Date, Validators.required],
      absenceType: [null, Validators.required],
    });
  }

  ngOnInit(): void {
    this.getAbsenceTypes();
    this.fillForm();
  }

  get getControl() {
    return this.form.controls;
  }

  updateAbsenceOfEmployee(): void {
    if(this.form.valid) {
      this.data.date = this.form.controls.date.value;
      this.data.absenceTypeId = this.form.controls.absenceType.value;
      this.data.editFormSubmitted = true;
      this.closeAddAbsenceDialog();
    }
  }

  fillForm(): void {
    var date: Date = new Date(this.data.date);
    this.form.controls.date.patchValue(date);
    this.form.controls.absenceType.patchValue(this.data.absenceTypeId);
    this.data.editFormSubmitted = false;
  }

  getAbsenceTypes(): void {
    this.absenceTypesService.getAll()
      .subscribe(
        data => {
          this.absenceTypes = data;
        },
        error => {
          console.log(error);
        }
      );
  }

  closeAddAbsenceDialog() {
    this.addAbsenceDialogRef.close(this.data);
  }
}
