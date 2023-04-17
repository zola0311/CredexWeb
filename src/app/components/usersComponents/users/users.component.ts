import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Users } from 'src/app/models/usersModel/users.model';
import { LoadingDialogComponent } from '../../dialogs/loading-dialog/loading-dialog.component';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { UsersService } from 'src/app/services/usersServices/users.service';
import { UserAddDialogComponent } from '../../dialogs/user-add-dialog/user-add-dialog.component';
import { UserEditDialogComponent } from '../../dialogs/user-edit-dialog/user-edit-dialog.component';
import { UserDeleteDialogComponent } from '../../dialogs/user-delete-dialog/user-delete-dialog.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  users: Users[] = [];
  displayedColumns: string[] = [
    'id',
    'email',
    'role',
    'editColumn',
    'deleteColumn',
  ];
  loadingDialogRef: MatDialogRef<LoadingDialogComponent>;
  @ViewChild('usersTable') table: MatTable<Users>;
  @ViewChild('paginator') paginator: MatPaginator;
  constructor(private dialog: MatDialog, private usersService: UsersService) { }

  dataSource = new MatTableDataSource(this.users);

  ngOnInit(): void {
    this.openLoadingDialog('Felhasználók betöltése...');
    this.getUsers();
  }

  getUsers(): void {
    this.usersService.getAll()
      .subscribe(
        data => {
          this.users = data;
          this.dataSource = new MatTableDataSource(this.users);
          this.dataSource.paginator = this.paginator;
          this.closeLoadingDialog();
          this.table.renderRows();
        },
        error => {
          console.log(error);
        }
      );
  }

  openAddUserDialog(): void {
    const dialogRef = this.dialog.open(UserAddDialogComponent, {
      disableClose: true,
      width: '500px',
      height: '550px',
      data: {
        user: Users,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if(result.user != null) {
        this.openLoadingDialog("Felhasználó hozzáadása...");
        this.usersService.create(result.user)
          .subscribe(
            () => {
              this.openLoadingDialog("Felhasználók betöltése...");
              this.getUsers();
              this.table.renderRows();
            },
            error => {
              console.log(error);
            }
          );
      }
    });
  }

  openEditUserDialog(user: Users): void {
    const dialogRef = this.dialog.open(UserEditDialogComponent, {
      disableClose: true,
      width: '500px',
      height: '550px',
      data: {
        user: user,
        editFormSubmitted: false
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if(result.editFormSubmitted) {
        this.openLoadingDialog("Felhasználó mentése...");
        this.usersService.update(result.user.id, result.user)
          .subscribe(
            () => {
              this.openLoadingDialog("Felhasználók betöltése...");
              this.getUsers();
              this.table.renderRows();
            },
            error => {
              console.log(error);
            }
          );
      }
    });
  }

  openDeleteUserDialog(user: Users): void {
    const dialogRef = this.dialog.open(UserDeleteDialogComponent, {
      disableClose: true,
      data: {
        deleteRequired: false,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if(result.deleteRequired) {
        this.openLoadingDialog("Felhasználó törlése...");
        this.usersService.delete(user.id)
          .subscribe(
            () => {
              this.openLoadingDialog("Felhasználók betöltése...");
              this.getUsers();
              this.table.renderRows();
            },
            error => {
              console.log(error);
            }
          );
      }
    });
  }

  openLoadingDialog(message: string) {
    this.dialog.open(LoadingDialogComponent, {
      disableClose: true,
      data: {
        message: message,
      },
    });
  }

  closeLoadingDialog() {
    this.dialog.closeAll();
  }

}
