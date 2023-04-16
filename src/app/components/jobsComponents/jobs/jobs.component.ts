import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Jobs } from 'src/app/models/jobsModel/jobs.model';
import { LoadingDialogComponent } from '../../dialogs/loading-dialog/loading-dialog.component';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { JobsService } from 'src/app/services/jobsServices/jobs.service';
import { JobAddDialogComponent } from '../../dialogs/job-add-dialog/job-add-dialog.component';
import { JobEditDialogComponent } from '../../dialogs/job-edit-dialog/job-edit-dialog.component';
import { JobDeleteDialogComponent } from '../../dialogs/job-delete-dialog/job-delete-dialog.component';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.scss']
})
export class JobsComponent implements OnInit {
  jobs: Jobs[] = [];
  displayedColumns: string[] = [
    'id',
    'name',
    'editColumn',
    'deleteColumn',
  ];
  loadingDialogRef: MatDialogRef<LoadingDialogComponent>;
  @ViewChild('jobsTable') table: MatTable<Jobs>;
  @ViewChild('paginator') paginator: MatPaginator;
  constructor(private dialog: MatDialog, private jobsService: JobsService) { }

  dataSource = new MatTableDataSource(this.jobs);

  ngOnInit(): void {
    this.openLoadingDialog("Beosztások betöltése...");
    this.getJobs();
  }

  getJobs(): void {
    this.jobsService.getAll()
      .subscribe(
        data => {
          this.jobs = data;
          this.dataSource = new MatTableDataSource(this.jobs);
          this.dataSource.paginator = this.paginator;
          this.closeLoadingDialog();
          this.table.renderRows();
        },
        error => {
          console.log(error);
        }
      );
  }

  openAddJobDialog(): void {
    const dialogRef = this.dialog.open(JobAddDialogComponent, {
      disableClose: true,
      width: '700px',
      height: '350px',
      data: {
        job: Jobs,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if(result.job != null) {
        this.openLoadingDialog("Beosztás hozzáadása...");
        this.jobsService.create(result.job)
          .subscribe(
            () => {
              this.openLoadingDialog("Beosztások betöltése...");
              this.getJobs();
              this.table.renderRows();
            },
            error => {
              console.log(error);
            }
          );
      }
    });
  }

  openEditJobDialog(job: Jobs): void {
    const dialogRef = this.dialog.open(JobEditDialogComponent, {
      disableClose: true,
      width: '700px',
      height: '350px',
      data: {
        job: job,
        editFormSubmitted: false
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if(result.editFormSubmitted) {
        this.openLoadingDialog("Beosztás mentése...");
        this.jobsService.update(result.job.id, result.job)
          .subscribe(
            () => {
              this.openLoadingDialog("Beosztások betöltése...");
              this.getJobs();
              this.table.renderRows();
            },
            error => {
              console.log(error);
            }
          );
      }
    });
  }

  openDeleteJobDialog(job: Jobs): void {
    const dialogRef = this.dialog.open(JobDeleteDialogComponent, {
      disableClose: true,
      data: {
        deleteRequired: false,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if(result.deleteRequired) {
        this.openLoadingDialog("Beosztás törlése...");
        this.jobsService.delete(job.id)
          .subscribe(
            () => {
              this.openLoadingDialog("Beosztások betöltése...");
              this.getJobs();
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
