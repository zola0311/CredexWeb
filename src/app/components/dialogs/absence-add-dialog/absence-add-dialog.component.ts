import { DatePipe, formatDate } from '@angular/common';
import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AddAbsenseInterface } from 'src/app/interfaces/add-absence-interface';
import { AbsencesTypes } from 'src/app/models/absencesTypesModel/absences-types.model';
import { AbsenceTypesService } from 'src/app/services/absenceTypesService/absence-types.service';
import { AbsencesOfEmployeesService } from 'src/app/services/absencesOfEmployeesService/absences-of-employees.service';

@Component({
  selector: 'app-absence-add-dialog',
  templateUrl: './absence-add-dialog.component.html',
  styleUrls: ['./absence-add-dialog.component.scss'],
})
export class AbsenceAddDialogComponent implements OnInit {
  form: FormGroup;
  submitted: boolean = false;
  absenceTypes: AbsencesTypes[];
  date: Date = new Date();
  constructor(
    private formBuilder: FormBuilder,
    private absencesOfEmployeesService: AbsencesOfEmployeesService,
    private absenceTypesService: AbsenceTypesService,
    private addAbsenceDialogRef: MatDialogRef<AbsenceAddDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AddAbsenseInterface
  ) {
    this.form = this.formBuilder.group({
      date: [Date, Validators.required],
      absenceType: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    this.getAbsenceTypes();
  }

  get getControl() {
    return this.form.controls;
  }

  addAbsenceToEmployee(): void {
    if(this.form.valid) {
      this.data.date = this.form.controls.date.value;
      this.data.absenceTypeId = this.form.controls.absenceType.value;
      this.closeAddAbsenceDialog();
    }
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
