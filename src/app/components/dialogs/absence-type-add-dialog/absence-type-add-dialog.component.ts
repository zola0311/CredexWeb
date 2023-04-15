import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AddAbsenceTypesInterface } from 'src/app/interfaces/add-absence-types-interface';
import { AbsencesTypes } from 'src/app/models/absencesTypesModel/absences-types.model';
import { AbsenceTypesService } from 'src/app/services/absenceTypesService/absence-types.service';
import { AbsencesOfEmployeesService } from 'src/app/services/absencesOfEmployeesService/absences-of-employees.service';

@Component({
  selector: 'app-absence-type-add-dialog',
  templateUrl: './absence-type-add-dialog.component.html',
  styleUrls: ['./absence-type-add-dialog.component.scss'],
})
export class AbsenceTypeAddDialogComponent implements OnInit {
  form: FormGroup;
  absenceType: AbsencesTypes = {
    id: 0,
    name: null,
    absenceOfEmployees: null
  };
  constructor(
    private formBuilder: FormBuilder,
    private absenceTypesService: AbsenceTypesService,
    private addAbsenceTypeDialogRef: MatDialogRef<AbsenceTypeAddDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AddAbsenceTypesInterface
  ) {
    this.form = this.formBuilder.group({
      name: [null, Validators.required],
    });
  }

  get getControl() {
    return this.form.controls;
  }

  ngOnInit(): void {}

  addAbsenceType(): void {
    if(this.form.valid) {
      this.absenceType.name = this.form.controls.name.value;
      this.data.absenceType = this.absenceType;
      this.closeAddAbsenceTypeDialog();
    }
  }

  closeAddAbsenceTypeDialog() {
    this.addAbsenceTypeDialogRef.close(this.data);
  }
}
