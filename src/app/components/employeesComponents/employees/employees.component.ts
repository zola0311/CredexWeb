import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { nextTick } from 'process';
import { AllowancesOfEmployees } from 'src/app/models/allowancesOfEmployeesModel/allowances-of-employees.model';
import { EmployeeAndAllowancesOfEmployees } from 'src/app/models/employeeAndAllowancesOfEmployees/employee-and-allowances-of-employees.model';
import { Employees } from 'src/app/models/employeesModel/employees.model';
import { AllowanceTypesViewModel } from 'src/app/models/viewModels/allowanceTypesViewModel/allowance-types-view-model.model';
import { AllowancesOfEmployeesService } from 'src/app/services/allowancesOfEmployeesServices/allowances-of-employees.service';
import { EmployeesService } from 'src/app/services/employeesServices/employees.service';
import { EmployeeAddDialogComponent } from '../../dialogs/employee-add-dialog/employee-add-dialog.component';
import { EmployeeDeleteDialogComponent } from '../../dialogs/employee-delete-dialog/employee-delete-dialog.component';
import { EmployeeDeletedDialogComponent } from '../../dialogs/employee-deleted-dialog/employee-deleted-dialog.component';
import { EmployeeEditDialogComponent } from '../../dialogs/employee-edit-dialog/employee-edit-dialog.component';
import { LoadingDialogComponent } from '../../dialogs/loading-dialog/loading-dialog.component';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss'],
})
export class EmployeesComponent implements OnInit {
  employees: Employees[] = [];
  displayedColumns: string[] = [
    'employeeId',
    'name',
    'job',
    'status',
    'editColumn',
    'detailsColumn',
    'deleteColumn',
  ];
  loadingDialogRef: MatDialogRef<LoadingDialogComponent>;
  employeeAddDialogRef: MatDialogRef<EmployeeAddDialogComponent>;
  employeeEditDialogRef: MatDialogRef<EmployeeEditDialogComponent>;
  employeeDeletedDialogRef: MatDialogRef<EmployeeDeletedDialogComponent>;
  @ViewChild('employeeTable') table: MatTable<Employees>;
  @ViewChild('paginator') paginator: MatPaginator;
  constructor(
    private employeesService: EmployeesService,
    private dialog: MatDialog,
    private allowancesOfEmployeesService: AllowancesOfEmployeesService
  ) {}

  dataSource = new MatTableDataSource(this.employees);

  ngOnInit(): void {
    this.openLoadingDialog('Munkavállalói adatok betöltése...');
    this.getEmployees();
  }

  getEmployees(): void {
    this.employeesService.getAll().subscribe(
      (data) => {
        this.employees = data;
        this.dataSource = new MatTableDataSource(this.employees);
        this.dataSource.paginator = this.paginator;
        this.closeLoadingDialog();
        this.table.renderRows();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  openDeletedEmployeesDialog(): void {
    const dialogRef = this.dialog.open(EmployeeDeletedDialogComponent, {
      disableClose: true,
      width: '100%',
      height: '80%',
    });

    dialogRef.afterClosed().subscribe(() => {
      this.openLoadingDialog('Munkavállalói adatok betöltése...');
      this.getEmployees();
    });
  }

  openAddNewEmployeeDialog(): void {
    const dialogRef = this.dialog.open(EmployeeAddDialogComponent, {
      disableClose: true,
      width: '100%',
      height: '80%',
      data: {
        employee: Employees,
        allowanceTypesViewModel: AllowanceTypesViewModel,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (
        result.employee != null &&
        result.allowanceTypesViewModel.length > 0
      ) {
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
          StatusId: result.employee.statusId,
        };
        this.employeesService.create(data).subscribe(
          (response) => {
            console.log(result.allowanceTypesViewModel);
            result.allowanceTypesViewModel.forEach((allowance) => {
              const allowanceData = {
                EmployeeId: response.employeeId,
                AllowanceTypeId: allowance.id,
                Value: allowance.value,
              };
              this.allowancesOfEmployeesService
                .create(allowanceData)
                .subscribe((error) => {
                  console.log(error);
                });
            });
            this.openLoadingDialog('Munkavállalói adatok betöltése...');
            this.getEmployees();
          },
          (error) => {
            console.log(error);
          }
        );
      }
    });
  }

  openEditEmployeeDialog(employee: Employees): void {
    const allowancesOfEmployees = this.getAllowancesOfEmployee(
      employee.employeeId
    );
    const dialogRef = this.dialog.open(EmployeeEditDialogComponent, {
      disableClose: true,
      width: '100%',
      height: '80%',
      data: {
        employee: employee,
        allowanceTypesViewModel: allowancesOfEmployees,
        editFormSubmitted: false,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result.editFormSubmitted == true) {
        this.openLoadingDialog('Munkavállalói adatok módosítása...');
        const allowancesOfEmployees: AllowancesOfEmployees[] = [];
        result.allowanceTypesViewModel.forEach((allowance) => {
          const allowanceData: AllowancesOfEmployees = {
            id: 0,
            employeeId: result.employee.employeeId,
            allowanceTypeId: allowance.id,
            value: allowance.value,
            employees: null,
            allowanceTypes: null,
          };
          allowancesOfEmployees.push(allowanceData);
        });
        const employeeAndAllowancesOfEmployees: EmployeeAndAllowancesOfEmployees =
          {
            employee: result.employee,
            allowancesOfEmployees: allowancesOfEmployees,
          };
        this.employeesService
          .update(result.employee.employeeId, employeeAndAllowancesOfEmployees)
          .subscribe(
            (response) => {
              this.openLoadingDialog('Munkavállalói adatok betöltése...');
              this.getEmployees();
            },
            (error) => {
              console.log(error);
            }
          );
      }
    });
  }

  openDeleteEmployeeDialog(employeeId: number): void {
    const dialogRef = this.dialog.open(EmployeeDeleteDialogComponent, {
      disableClose: true,
      data: {
        deleteRequired: false,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result.deleteRequierd == true) {
        this.openLoadingDialog('Munkavállaló törlése...');
        this.employeesService.get(employeeId).subscribe(
          (data) => {
            data.isDeleted = true;
            this.employeesService
              .deleteEmployee(data.employeeId, data)
              .subscribe(
                () => {
                  this.openLoadingDialog('Munkavállalói adatok betöltése...');
                  this.getEmployees();
                },
                (error) => {
                  console.log(error);
                }
              );
          },
          (error) => {
            console.log(error);
            return null;
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

  getAllowancesOfEmployee(employeeId: number): AllowanceTypesViewModel[] {
    let allowancesOfEmployee: AllowanceTypesViewModel[] = [];
    this.allowancesOfEmployeesService
      .getAllowancesOfEmployee(employeeId)
      .subscribe(
        (data) => {
          if (data.length > 0) {
            data.forEach((element) => {
              let currentAllowance: AllowanceTypesViewModel = {
                id: null,
                name: null,
                value: null,
              };
              currentAllowance.id = element.allowanceTypes.id;
              currentAllowance.name = element.allowanceTypes.name;
              currentAllowance.value = element.value;
              allowancesOfEmployee.push(currentAllowance);
            });
          }
        },
        (error) => {
          console.log(error);
        }
      );
    return allowancesOfEmployee;
  }
}
