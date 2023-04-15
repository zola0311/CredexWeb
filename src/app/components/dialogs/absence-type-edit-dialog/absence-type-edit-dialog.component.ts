import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EditAbsenceInterface } from 'src/app/interfaces/edit-absence-interface';
import { EditAbsenceTypesInterface } from 'src/app/interfaces/edit-absence-types-interface';
import { AbsencesTypes } from 'src/app/models/absencesTypesModel/absences-types.model';
import { AbsenceTypesService } from 'src/app/services/absenceTypesService/absence-types.service';

@Component({
  selector: 'app-absence-type-edit-dialog',
  templateUrl: './absence-type-edit-dialog.component.html',
  styleUrls: ['./absence-type-edit-dialog.component.scss']
})
export class AbsenceTypeEditDialogComponent implements OnInit {
  form: FormGroup;
  absenceType: AbsencesTypes = {
    id: 0,
    name: null,
    absenceOfEmployees: null
  };
  constructor(
    private formBuilder: FormBuilder,
    private absenceTypesService: AbsenceTypesService,
    private editAbsenceTypeDialogRef: MatDialogRef<AbsenceTypeEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: EditAbsenceTypesInterface
  ) {
    this.form = this.formBuilder.group({
      name: [null, Validators.required],
    });
   }

  ngOnInit(): void {
    this.fillForm();
  }

  get getControl() {
    return this.form.controls;
  }

  fillForm(): void {
    this.form.controls.name.patchValue(this.data.absenceType.name);
  }

  updateAbsenceType(): void {
    if(this.form.valid) {
      this.absenceType.id = this.data.absenceType.id;
      this.absenceType.name = this.form.controls.name.value;
      this.data.absenceType = this.absenceType;
      this.data.editFormSubmitted = true;
      this.closeEditAbsenceTypeDialog();
    }
  }

  closeEditAbsenceTypeDialog() {
    this.editAbsenceTypeDialogRef.close(this.data);
  }

}
