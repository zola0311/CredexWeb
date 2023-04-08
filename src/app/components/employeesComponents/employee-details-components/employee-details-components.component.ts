import { Component, OnInit, Input } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Employees } from 'src/app/models/employeesModel/employees.model';
import { EmployeesService } from 'src/app/services/employeesServices/employees.service';
import { LoadingDialogComponent } from '../../dialogs/loading-dialog/loading-dialog.component';

@Component({
  selector: 'app-employee-details-components',
  templateUrl: './employee-details-components.component.html',
  styleUrls: ['./employee-details-components.component.scss']
})
export class EmployeeDetailsComponentsComponent implements OnInit {
  employee: Employees;
  @Input() employeeId: number;
  pageLoaded: boolean = false;
  loadingDialogRef: MatDialogRef<LoadingDialogComponent>;
  constructor(private employeesService: EmployeesService, private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.getEmployee(this.employeeId);
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
