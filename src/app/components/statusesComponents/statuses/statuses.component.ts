import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { LoadingDialogComponent } from '../../dialogs/loading-dialog/loading-dialog.component';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Statuses } from 'src/app/models/statusesModel/statuses.model';
import { MatPaginator } from '@angular/material/paginator';
import { StatusesService } from 'src/app/services/statusesServices/statuses.service';
import { StatusesAddDialogComponent } from '../../dialogs/statuses-add-dialog/statuses-add-dialog.component';
import { StatusesEditDialogComponent } from '../../dialogs/statuses-edit-dialog/statuses-edit-dialog.component';
import { StatusesDeleteDialogComponent } from '../../dialogs/statuses-delete-dialog/statuses-delete-dialog.component';

@Component({
  selector: 'app-statuses',
  templateUrl: './statuses.component.html',
  styleUrls: ['./statuses.component.scss']
})
export class StatusesComponent implements OnInit {
  statuses: Statuses[] = [];
  displayedColumns: string[] = [
    'id',
    'name',
    'editColumn',
    'deleteColumn',
  ];
  loadingDialogRef: MatDialogRef<LoadingDialogComponent>;
  @ViewChild('statusesTable') table: MatTable<Statuses>;
  @ViewChild('paginator') paginator: MatPaginator;
  constructor(private dialog: MatDialog, private statusesService: StatusesService) { }

  dataSource = new MatTableDataSource(this.statuses);

  ngOnInit(): void {
    this.openLoadingDialog("Státuszok betöltése...");
    this.getStatuses();
  }

  getStatuses(): void {
    this.statusesService.getAll()
      .subscribe(
        data => {
          this.statuses = data;
          this.dataSource = new MatTableDataSource(this.statuses);
          this.dataSource.paginator = this.paginator;
          this.closeLoadingDialog();
          this.table.renderRows();
        },
        error => {
          console.log(error);
        }
      );
  }

  openAddStatusDialog(): void {
    const dialogRef = this.dialog.open(StatusesAddDialogComponent, {
      disableClose: true,
      width: '700px',
      height: '350px',
      data: {
        status: Statuses,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if(result.status != null) {
        this.openLoadingDialog("Státusz hozzáadása...");
        this.statusesService.create(result.status)
          .subscribe(
            () => {
              this.openLoadingDialog("Státuszok betöltése...");
              this.getStatuses();
              this.table.renderRows();
            },
            error => {
              console.log(error);
            }
          );
      }
    });
  }

  openEditStatusDialog(status: Statuses): void {
    const dialogRef = this.dialog.open(StatusesEditDialogComponent, {
      disableClose: true,
      width: '700px',
      height: '350px',
      data: {
        status: status,
        editFormSubmitted: false
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if(result.editFormSubmitted) {
        this.openLoadingDialog("Státusz mentése...");
        this.statusesService.update(result.status.id, result.status)
          .subscribe(
            () => {
              this.openLoadingDialog("Státuszok betöltése...");
              this.getStatuses();
              this.table.renderRows();
            },
            error => {
              console.log(error);
            }
          );
      }
    });
  }

  openDeleteStatusesDialog(status: Statuses): void {
    const dialogRef = this.dialog.open(StatusesDeleteDialogComponent, {
      disableClose: true,
      data: {
        deleteRequired: false,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if(result.deleteRequired) {
        this.openLoadingDialog("Státusz törlése...");
        this.statusesService.delete(status.id)
          .subscribe(
            () => {
              this.openLoadingDialog("Státuszok betöltése...");
              this.getStatuses();
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
