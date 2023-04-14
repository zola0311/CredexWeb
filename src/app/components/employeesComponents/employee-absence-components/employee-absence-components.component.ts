import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { LoadingDialogComponent } from '../../dialogs/loading-dialog/loading-dialog.component';
import { AbsencesOfEmployeesService } from 'src/app/services/absencesOfEmployeesService/absences-of-employees.service';
import { AbsencesOfEmployees } from 'src/app/models/absencesOfEmployeesModel/absences-of-employees.model';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { AbsenceAddDialogComponent } from '../../dialogs/absence-add-dialog/absence-add-dialog.component';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-employee-absence-components',
  templateUrl: './employee-absence-components.component.html',
  styleUrls: ['./employee-absence-components.component.scss']
})
export class EmployeeAbsenceComponentsComponent implements OnInit {
  absencesOfEmployee: AbsencesOfEmployees[] = [];
  displayedColumns: string[] = [
    'date',
    'absenceType',
    'editColumn',
    'deleteColumn',
  ];
  @Input() employeeId: number;
  pageLoaded: boolean = false;
  loadingDialogRef: MatDialogRef<LoadingDialogComponent>;
  absenceAddDialogRef: MatDialogRef<AbsenceAddDialogComponent>;
  @ViewChild('employeeTable') table: MatTable<AbsencesOfEmployees>;
  @ViewChild('paginator') paginator: MatPaginator;
  constructor(private dialog: MatDialog, private absencesOfEmployeesService: AbsencesOfEmployeesService) { }

  dataSource = new MatTableDataSource(this.absencesOfEmployee);

  ngOnInit(): void {
    this.openLoadingDialog('Munkavállalói adatok betöltése...');
    this.getEmployeeAbsences(this.employeeId);
  }

  getEmployeeAbsences(employeeId: number): void {
    this.absencesOfEmployeesService.getEmployeeAbsences(employeeId)
      .subscribe(
        data => {
          this.absencesOfEmployee = data;
          this.dataSource = new MatTableDataSource(this.absencesOfEmployee);
          this.dataSource.paginator = this.paginator;
          this.closeLoadingDialog();
          this.pageLoaded = true;
          this.table.renderRows();
        },
        error => {
          console.log(error);
        }
      );
  }

  openAddAbsenceDialog(): void {
    const dialogRef = this.dialog.open(AbsenceAddDialogComponent, {
      disableClose: true,
      width: '50%',
      height: '30%',
      data: {
        date: Date,
        absenceTypeId: Number
      }
    });

    dialogRef.afterClosed().subscribe((result) => {
      const data = {
        Date: formatDate(result.date, 'yyyy-MM-dd', 'en-EN'),
        AbsenceTypeId: result.absenceTypeId,
        EmployeeId: this.employeeId
      }
      console.log(data);
      this.absencesOfEmployeesService.create(data)
        .subscribe(
          response => {

          },
          error => {
            console.log(error);
          }
        );

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
