import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  constructor(
    private formBuilder: FormBuilder,
    private absencesOfEmployeesService: AbsencesOfEmployeesService,
    private absenceTypesService: AbsenceTypesService
  ) {
    this.form = this.formBuilder.group({
      date: [null, Validators.required],
      absenceType: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    this.getAbsenceTypes();
  }

  get getControl() {
    return this.form.controls;
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
}
