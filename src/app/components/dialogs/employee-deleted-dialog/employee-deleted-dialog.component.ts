import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Employees } from 'src/app/models/employeesModel/employees.model';
import { EmployeesService } from 'src/app/services/employeesServices/employees.service';

@Component({
  selector: 'app-employee-deleted-dialog',
  templateUrl: './employee-deleted-dialog.component.html',
  styleUrls: ['./employee-deleted-dialog.component.scss'],
})
export class EmployeeDeletedDialogComponent implements OnInit {
  deletedEmployees: Employees[] = [];
  pageLoaded: boolean = false;
  @ViewChild('deletedEmployeesTable') table: MatTable<Employees>;
  @ViewChild('paginator') paginator: MatPaginator;
  dataSource = new MatTableDataSource(this.deletedEmployees);
  displayedColumns: string[] = [
    'employeeId',
    'name',
    'job',
    'status',
    'restoreColumn',
  ];

  constructor(
    private employeesServices: EmployeesService,
    private deletedEmployeesDialogRef: MatDialogRef<EmployeeDeletedDialogComponent>
  ) {}

  ngOnInit(): void {
    this.getDeletedEmployees();
  }

  restoreEmployee(id: number): void {
    if (id != 0 || id != null) {

      this.employeesServices.get(id)
        .subscribe(
          data => {
            data.isDeleted = false;
            this.employeesServices
            .restoreEmployee(data.employeeId, data)
            .subscribe(
              () => {
                this.getDeletedEmployees();
                this.table.renderRows();
              },
              (error) => {
                console.log(error);
              }
            );
          },
          error => {
            console.log(error);
          }
        );
    }
  }

  getDeletedEmployees(): void {
    this.employeesServices.getDeletedEmployees().subscribe(
      (data) => {
        this.deletedEmployees = data;
        this.pageLoaded = true;
        this.dataSource = new MatTableDataSource(this.deletedEmployees);
        this.dataSource.paginator = this.paginator;
        this.table.renderRows();
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
