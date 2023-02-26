import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { nextTick } from 'process';
import { Employees } from 'src/app/models/employeesModel/employees.model';
import { AllowanceTypesViewModel } from 'src/app/models/viewModels/allowanceTypesViewModel/allowance-types-view-model.model';
import { AllowancesOfEmployeesService } from 'src/app/services/allowancesOfEmployeesServices/allowances-of-employees.service';
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
  displayedColumns: string[] = ['employeeId', 'name', 'job', 'status', 'editColumn', 'detailsColumn', 'deleteColumn'];
  dataSource = null;
  loadingDialogRef: MatDialogRef<LoadingDialogComponent>;
  employeeAddDialogRef: MatDialogRef<EmployeeAddDialogComponent>;
  @ViewChild('table') table: MatTable<Employees>;
  constructor(private employeesService: EmployeesService, private dialog: MatDialog, private allowancesOfEmployeesService: AllowancesOfEmployeesService) { }

  ngOnInit(): void {
    this.openLoadingDialog('Munkavállalói adatok betöltése...');
    this.getEmployees();
  }

  getEmployees(): void {
    this.employeesService.getAll()
      .subscribe(
        data => {
          let employeeData: Employees[] = [];
          this.employees = data;
          this.table.dataSource = this.employees;
          this.closeLoadingDialog();
          this.table.renderRows();
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
      if(result.employee != null && result.allowanceTypesViewModel.length > 0) {
        this.openLoadingDialog('Munkavállaló hozzáadása...');
        const data = {
          Name: result.employee.name,
          BirthName: result.employee.birthName,
          PhoneNumber: result.employee.phoneNumber,
          IdentityCardNumber: result.employee.indentityCardNumber,
          GenderId: result.employee.genderId,
          NameOfMother: result.employee.nameOfMother,
          PostalCode: result.employee.postalCode,
          City: result.employee.city,
          Address: result.employee.address,
          JobId: result.employee.jobId,
          StatusId: result.employee.statusId
        }
        this.employeesService.create(data)
          .subscribe(
            response => {
              console.log(result.allowanceTypesViewModel);
              result.allowanceTypesViewModel.forEach((allowance) => {
                const allowanceData = {
                  EmployeeId: response.employeeId,
                  AllowanceTypeId: allowance.id,
                  Value: allowance.value
                }
                this.allowancesOfEmployeesService.create(allowanceData)
                  .subscribe(
                    error => {
                      console.log(error);
                    }
                  );
              });
              this.openLoadingDialog('Munkavállalói adatok betöltése...');
              this.getEmployees();
            },
            error => {
              console.log(error);
            }
          );
      }

    })
  }

  openLoadingDialog(message: string) {
    this.dialog.open(LoadingDialogComponent, {
      disableClose: true,
      data: {
        message: message
      },
    });
  }

  closeLoadingDialog() {
    this.dialog.closeAll();
  }

}


