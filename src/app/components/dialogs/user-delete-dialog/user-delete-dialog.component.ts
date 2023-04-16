import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserDeleteInterface } from 'src/app/interfaces/delete-user-interface';

@Component({
  selector: 'app-user-delete-dialog',
  templateUrl: './user-delete-dialog.component.html',
  styleUrls: ['./user-delete-dialog.component.scss']
})
export class UserDeleteDialogComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: UserDeleteInterface,
    private deleteUserDialogRef: MatDialogRef<UserDeleteDialogComponent>
  ) { }

  ngOnInit(): void {
  }

  deleteUser(): void {
    this.data.deleteRequired = true;
    this.deleteUserDialogRef.close(this.data);
  }

}
