import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { DeleteEmployeeInterface } from 'src/app/interfaces/delete-employee-interface';
import { Employees } from 'src/app/models/employeesModel/employees.model';
import { EmployeesService } from 'src/app/services/employeesServices/employees.service';

@Component({
  selector: 'app-employee-delete-dialog',
  templateUrl: './employee-delete-dialog.component.html',
  styleUrls: ['./employee-delete-dialog.component.scss'],
})
export class EmployeeDeleteDialogComponent implements OnInit {
  employee: Employees;
  displayedColumns: string[] = [
    'employeeId',
    'name',
    'job',
    'status'
  ];
  @ViewChild('employeeTable') table: MatTable<Employees>;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DeleteEmployeeInterface,
    private employeesService: EmployeesService,
    private deleteEmployeeDialogRef: MatDialogRef<EmployeeDeleteDialogComponent>
  ) {}

  dataSource = this.data.employee;

  ngOnInit(): void {}

  deleteEmployee(): void {
    this.data.deleteRequierd = true;
    this.data.employee.isDeleted = true;
    this.deleteEmployeeDialogRef.close(this.data);
  }
}
