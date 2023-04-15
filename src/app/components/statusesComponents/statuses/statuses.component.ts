import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { LoadingDialogComponent } from '../../dialogs/loading-dialog/loading-dialog.component';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Statuses } from 'src/app/models/statusesModel/statuses.model';
import { MatPaginator } from '@angular/material/paginator';
import { StatusesService } from 'src/app/services/statusesServices/statuses.service';
import { StatusesAddDialogComponent } from '../../dialogs/statuses-add-dialog/statuses-add-dialog.component';

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
