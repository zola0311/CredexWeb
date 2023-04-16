import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DeleteStausesInterface } from 'src/app/interfaces/delete-statuses-interface';

@Component({
  selector: 'app-statuses-delete-dialog',
  templateUrl: './statuses-delete-dialog.component.html',
  styleUrls: ['./statuses-delete-dialog.component.scss']
})
export class StatusesDeleteDialogComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DeleteStausesInterface,
    private deleteStatusesDialogRef: MatDialogRef<StatusesDeleteDialogComponent>
  ) { }

  ngOnInit(): void {
  }

  deleteStatus(): void {
    this.data.deleteRequired = true;
    this.deleteStatusesDialogRef.close(this.data);
  }

}
