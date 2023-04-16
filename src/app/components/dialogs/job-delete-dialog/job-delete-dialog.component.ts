import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DeleteJobInterface } from 'src/app/interfaces/delete-jobs-interface';

@Component({
  selector: 'app-job-delete-dialog',
  templateUrl: './job-delete-dialog.component.html',
  styleUrls: ['./job-delete-dialog.component.scss']
})
export class JobDeleteDialogComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DeleteJobInterface,
    private deleteJobDialogRef: MatDialogRef<JobDeleteDialogComponent>
  ) { }

  ngOnInit(): void {
  }

  deleteJob(): void {
    this.data.deleteRequired = true;
    this.deleteJobDialogRef.close(this.data);
  }

}
