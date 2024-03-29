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
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DeleteEmployeeInterface,
    private deleteEmployeeDialogRef: MatDialogRef<EmployeeDeleteDialogComponent>
  ) {}

  ngOnInit(): void {}

  deleteEmployee(): void {
    this.data.deleteRequierd = true;
    this.deleteEmployeeDialogRef.close(this.data);
  }
}
