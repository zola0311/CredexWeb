import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Employees } from 'src/app/models/employeesModel/employees.model';
import { AllowanceTypesViewModel } from 'src/app/models/viewModels/allowanceTypesViewModel/allowance-types-view-model.model';
import { EmployeesService } from 'src/app/services/employeesServices/employees.service';
import { EmployeeAddDialogComponent } from '../../dialogs/employee-add-dialog/employee-add-dialog.component';
import { LoadingDialogComponent } from '../../dialogs/loading-dialog/loading-dialog.component';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit {
  employees: Employees[];
  displayedColumns: string[] = ['employeeId', 'name', 'job', 'valueStream', 'status', 'editColumn', 'detailsColumn', 'deleteColumn'];
  dataSource = null;
  loadingDialogRef: MatDialogRef<LoadingDialogComponent>;
  employeeAddDialogRef: MatDialogRef<EmployeeAddDialogComponent>;
  constructor(private employeesService: EmployeesService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.openLoadingDialog();
    this.getEmployees();
  }

  getEmployees(): void {
    this.employeesService.getAll()
      .subscribe(
        data => {
          this.employees = data;
          this.dataSource = this.employees;
          this.closeLoadingDialog();
        },
        error => {
          console.log(error);
        }
      );
  }

  openAddNewEmployeeDialog(): void {
    const dialogRef = this.dialog.open(EmployeeAddDialogComponent, {
      disableClose: true,
      width: '100%',
      height: '80%',
      data: {employee: Employees, allowanceTypesViewModel: AllowanceTypesViewModel}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result.allowanceTypesViewModel);
      console.log(result.employee);
    })
  }

  openLoadingDialog() {
    this.dialog.open(LoadingDialogComponent, {
      disableClose: true,
      data: {
        message: 'Munkavállalói adatok betöltése...'
      },
    });
  }

  closeLoadingDialog() {
    this.dialog.closeAll();
  }

}


