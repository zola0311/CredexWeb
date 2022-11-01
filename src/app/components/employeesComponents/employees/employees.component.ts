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
  constructor(private employeesService: EmployeesService) { }

  ngOnInit(): void {
    this.getEmployees();
  }

  getEmployees(): void {
    this.employeesService.getAll()
      .subscribe(
        data => {
          this.employees = data;
        },
        error => {
          console.log(error);
        }
      );
  }

}
