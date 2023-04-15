import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DeleteAbsenceInterface } from 'src/app/interfaces/delete-absence-interface';

@Component({
  selector: 'app-absence-delete-dialog',
  templateUrl: './absence-delete-dialog.component.html',
  styleUrls: ['./absence-delete-dialog.component.scss']
})
export class AbsenceDeleteDialogComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DeleteAbsenceInterface,
  private deleteAbsenceDialogRef: MatDialogRef<AbsenceDeleteDialogComponent>) { }

  ngOnInit(): void {
  }

  deleteAbsence(): void {
    this.data.deleteRequired = true;
    this.deleteAbsenceDialogRef.close(this.data);
  }

}
