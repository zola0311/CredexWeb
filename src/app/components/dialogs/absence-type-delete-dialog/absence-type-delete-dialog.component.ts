import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DeleteAbsenceTypesInterface } from 'src/app/interfaces/delete-absence-types-interface';
import { AbsenceDeleteDialogComponent } from '../absence-delete-dialog/absence-delete-dialog.component';

@Component({
  selector: 'app-absence-type-delete-dialog',
  templateUrl: './absence-type-delete-dialog.component.html',
  styleUrls: ['./absence-type-delete-dialog.component.scss'],
})
export class AbsenceTypeDeleteDialogComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DeleteAbsenceTypesInterface,
    private deleteAbsenceDialogRef: MatDialogRef<AbsenceDeleteDialogComponent>
  ) {}

  ngOnInit(): void {}

  deleteAbsence(): void {
    this.data.deleteRequired = true;
    this.deleteAbsenceDialogRef.close(this.data);
  }
}
