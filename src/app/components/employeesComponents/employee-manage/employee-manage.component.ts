import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingDialogComponent } from '../../dialogs/loading-dialog/loading-dialog.component';
import { EmployeesService } from 'src/app/services/employeesServices/employees.service';
import { MatDialog } from '@angular/material/dialog';
import { Employees } from 'src/app/models/employeesModel/employees.model';

@Component({
  selector: 'app-employee-manage',
  templateUrl: './employee-manage.component.html',
  styleUrls: ['./employee-manage.component.scss']
})
export class EmployeeManageComponent implements OnInit {
  employeeId: number;
  activatedPageId: number;
  employee: Employees;
  pageLoaded: boolean = false;
  constructor(private route: ActivatedRoute, private employeesService: EmployeesService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getEmployeeId();
    this.activatedPageId = 0;
  }

  getEmployee(employeeId: number): void {
    this.openLoadingDialog('Munkavállalói adatok betöltése...');
    this.employeesService.get(employeeId)
      .subscribe(
        data => {
          this.employee = data;
          this.pageLoaded = true;
          this.closeLoadingDialog();
        },
        error => {
          console.log(error);
        }
      );
  }

  getEmployeeId(): void {
    this.employeeId = this.route.snapshot.params.employeeId;
    this.getEmployee(this.employeeId);
  }

  setActivatedPage(pageId: number): void {
    this.activatedPageId = pageId;
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
