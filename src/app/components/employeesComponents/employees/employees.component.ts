import { Component, OnInit } from '@angular/core';
import { Employees } from 'src/app/models/employeesModel/employees.model';
import { EmployeesService } from 'src/app/services/employeesServices/employees.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit {
  employees: Employees[];
  displayedColumns: string[] = ['employeeId', 'name', 'job', 'valueStream', 'status', 'editRow', 'deleteRow'];
  dataSource = null;
  constructor(private employeesService: EmployeesService) { }

  ngOnInit(): void {
    this.getEmployees();
  }

  getEmployees(): void {
    this.employeesService.getAll()
      .subscribe(
        data => {
          this.employees = data;
          this.dataSource = this.employees;
        },
        error => {
          console.log(error);
        }
      );
  }

}
