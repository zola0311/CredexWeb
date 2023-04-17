import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MonthlyStatementInterface } from 'src/app/interfaces/monthly-statement-interface';
import { AbsencesOfEmployees } from 'src/app/models/absencesOfEmployeesModel/absences-of-employees.model';
import { AllowancesOfEmployees } from 'src/app/models/allowancesOfEmployeesModel/allowances-of-employees.model';
import { Employees } from 'src/app/models/employeesModel/employees.model';
import { MonthlyStatementsViewModel } from 'src/app/models/viewModels/monthlyStatementsViewModel/monthly-statements-view-model.model';
import { AbsencesOfEmployeesService } from 'src/app/services/absencesOfEmployeesService/absences-of-employees.service';
import { AllowancesOfEmployeesService } from 'src/app/services/allowancesOfEmployeesServices/allowances-of-employees.service';
import { EmployeesService } from 'src/app/services/employeesServices/employees.service';


@Component({
  selector: 'app-monthly-statement-dialog',
  templateUrl: './monthly-statement-dialog.component.html',
  styleUrls: ['./monthly-statement-dialog.component.scss']
})
export class MonthlyStatementDialogComponent implements OnInit {
  form: FormGroup;
  employee: Employees;
  allowancesOfEmployees: AllowancesOfEmployees[];
  monthlyStatement: MonthlyStatementsViewModel;
  absencesOfEmployees: AbsencesOfEmployees[];
  absencesOfEmployee: AbsencesOfEmployees[] = [];
  constructor(
    private formBuilder: FormBuilder,
    private employeesService: EmployeesService,
    private monthlyStatementDialogRef: MatDialogRef<MonthlyStatementDialogComponent>,
    private allowancesOfEmployeesService: AllowancesOfEmployeesService,
    private absencesOfEmployeesService: AbsencesOfEmployeesService,
    @Inject(MAT_DIALOG_DATA) public data: MonthlyStatementInterface) {
      this.form = this.formBuilder.group({
        date: [null]
      });
     }

  ngOnInit(): void {
    this.getEmployee(this.data.employeeId);
  }

  search(): void {
    this.absencesOfEmployee.length = 0;
    var date = this.form.controls.date.value;
    var elements = date.split("-");
    this.absencesOfEmployees.forEach((element) => {
      var date: Date = new Date(element.date);
      let dateYear = date.getFullYear();
      let dateMonth = date.getUTCMonth() + 1;
      if(dateYear == elements[0] && dateMonth == elements[1]) {
        this.absencesOfEmployee.push(element);
      }
    });
  }

  getEmployee(employeeId: number): void {
    this.employeesService.get(employeeId)
      .subscribe(
        data => {
          this.employee = data;
          this.getAllowancesOfEmployees(employeeId);
        },
        error => {
          console.log(error);
        }
      );
  }

  getAllowancesOfEmployees(employeeId: number): void {
    this.allowancesOfEmployeesService.getAllowancesOfEmployee(employeeId)
      .subscribe(
        data => {
          this.allowancesOfEmployees = data;
          this.getAbsencesOfEmployee(employeeId);
        },
        error => {
          console.log(error);
        }
      );
  }

  getAbsencesOfEmployee(employeeId: number): void {
    this.absencesOfEmployeesService.getEmployeeAbsences(employeeId)
      .subscribe(
        data => {
          this.absencesOfEmployees = data;
        },
        error => {
          console.log(error);
        }
      );
  }

}
