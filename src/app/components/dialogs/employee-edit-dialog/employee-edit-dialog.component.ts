import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { AddEmployeeInterface } from 'src/app/interfaces/add-employee-interface';
import { EditEmployeeInterface } from 'src/app/interfaces/edit-employee-interface';
import { AllowanceTypes } from 'src/app/models/allowanceTypesModel/allowance-types.model';
import { Employees } from 'src/app/models/employeesModel/employees.model';
import { Genders } from 'src/app/models/gendersModel/genders.model';
import { Jobs } from 'src/app/models/jobsModel/jobs.model';
import { Statuses } from 'src/app/models/statusesModel/statuses.model';
import { AllowanceTypesViewModel } from 'src/app/models/viewModels/allowanceTypesViewModel/allowance-types-view-model.model';
import { AllowanceTypesService } from 'src/app/services/allowanceTypesServices/allowance-types.service';
import { GendersService } from 'src/app/services/gendersServices/genders.service';
import { JobsService } from 'src/app/services/jobsServices/jobs.service';
import { StatusesService } from 'src/app/services/statusesServices/statuses.service';
import { LoadingDialogComponent } from '../loading-dialog/loading-dialog.component';

@Component({
  selector: 'app-employee-edit-dialog',
  templateUrl: './employee-edit-dialog.component.html',
  styleUrls: ['./employee-edit-dialog.component.scss'],
})
export class EmployeeEditDialogComponent implements OnInit {
  form: FormGroup;
  statuses: Statuses[];
  jobs: Jobs[];
  genders: Genders[];
  allowanceTypes: AllowanceTypes[];
  numberRegEx = /\-?\d*\.?\d{1,2}/;
  addedAllowanceTypes: AllowanceTypesViewModel[] = [];
  addedAllowancesIsNotNull: boolean = false;
  submitted: boolean = false;
  employee: Employees = {
    employeeId: null,
    name: '',
    birthName: '',
    phoneNumber: '',
    identityCardNumber: '',
    genderId: null,
    nameOfMother: '',
    postalCode: null,
    city: '',
    address: '',
    jobId: null,
    statusId: null,
    isDeleted: false,
    statuses: null,
    allowanceOfEmployees: null,
    genders: null,
    users: null,
    jobs: null,
  };
  displayedColumns: string[] = ['name', 'value', 'deleteColumn'];
  loadingDialogRef: MatDialogRef<LoadingDialogComponent>;
  @ViewChild('table') table: MatTable<AllowanceTypesViewModel>;
  constructor(
    private formBuilder: FormBuilder,
    private statusesService: StatusesService,
    private jobsService: JobsService,
    private gendersService: GendersService,
    private allowanceTypesService: AllowanceTypesService,
    private addEmployeeDialogRef: MatDialogRef<EmployeeEditDialogComponent>,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: EditEmployeeInterface
  ) {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      birthName: ['', Validators.required],
      phoneNumber: [
        null,
        [Validators.required, Validators.pattern(this.numberRegEx)],
      ],
      identityCardNumber: [null, Validators.required],
      genderId: [null, Validators.required],
      nameOfMother: ['', Validators.required],
      postalCode: [
        null,
        [Validators.required, Validators.pattern(this.numberRegEx)],
      ],
      city: ['', Validators.required],
      address: ['', Validators.required],
      jobId: [null, Validators.required],
      statusId: [null, Validators.required],
      allowanceTypeForAdd: '',
      allowanceValueForAdd: '',
      allowances: this.formBuilder.array([]),
    });
  }

  get getControl() {
    return this.form.controls;
  }

  ngOnInit(): void {
    this.getStatuses();
    this.getJobs();
    this.getGenders();
    this.getAllowanceTypes();
    this.fillEmployeeForm();
    this.data.editFormSubmitted = false;
  }

  updateEmployee(): void {
    this.submitted = true;
    if (this.addedAllowanceTypes.length == 0) {
      this.addedAllowancesIsNotNull = false;
    } else {
      this.addedAllowancesIsNotNull = true;
    }
    if (this.form.valid && this.addedAllowancesIsNotNull == true) {
      this.data.editFormSubmitted = true;
      this.employee.employeeId = this.data.employee.employeeId;
      this.employee.name = this.form.controls.name.value;
      this.employee.birthName = this.form.controls.birthName.value;
      this.employee.phoneNumber = this.form.controls.phoneNumber.value;
      this.employee.identityCardNumber =
        this.form.controls.identityCardNumber.value;
      this.employee.nameOfMother = this.form.controls.nameOfMother.value;
      this.employee.genderId = this.form.controls.genderId.value;
      this.employee.postalCode = this.form.controls.postalCode.value;
      this.employee.city = this.form.controls.city.value;
      this.employee.address = this.form.controls.address.value;
      this.employee.jobId = this.form.controls.jobId.value;
      this.employee.statusId = this.form.controls.statusId.value;
      this.data.employee = this.employee;
      this.data.allowanceTypesViewModel = this.addedAllowanceTypes;
      this.closeAddEmployeeDialog();
    } else {
      Object.keys(this.form.controls).forEach((field) => {
        const control = this.form.get(field);
        control.markAsTouched({ onlySelf: true });
      });
    }
  }

  fillEmployeeForm(): void {
    this.openLoadingDialog('Munkavállalói adatok betöltése...');
    this.form.controls.name.patchValue(this.data.employee.name);
    this.form.controls.birthName.patchValue(this.data.employee.birthName);
    this.form.controls.phoneNumber.patchValue(this.data.employee.phoneNumber);
    this.form.controls.identityCardNumber.patchValue(
      this.data.employee.identityCardNumber
    );
    this.form.controls.genderId.patchValue(this.data.employee.genderId);
    this.form.controls.nameOfMother.patchValue(this.data.employee.nameOfMother);
    this.form.controls.postalCode.patchValue(this.data.employee.postalCode);
    this.form.controls.city.patchValue(this.data.employee.city);
    this.form.controls.address.patchValue(this.data.employee.address);
    this.form.controls.jobId.patchValue(this.data.employee.jobId);
    this.form.controls.statusId.patchValue(this.data.employee.statusId);
    this.addedAllowanceTypes = this.data.allowanceTypesViewModel;
    this.closeLoadingDialog();
    this.table.renderRows();
  }

  getStatuses(): void {
    this.statusesService.getAll().subscribe(
      (data) => {
        this.statuses = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getJobs(): void {
    this.jobsService.getAll().subscribe(
      (data) => {
        this.jobs = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getGenders(): void {
    this.gendersService.getAll().subscribe(
      (data) => {
        this.genders = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getAllowanceTypes(): void {
    this.allowanceTypesService.getAll().subscribe(
      (data) => {
        this.allowanceTypes = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  addAllowance() {
    if (
      this.form.controls.allowanceTypeForAdd.value != null &&
      this.form.controls.allowanceValueForAdd.value > 0
    ) {
      let allowance: AllowanceTypesViewModel = {
        id: null,
        name: null,
        value: null,
      };
      allowance.id = this.form.controls.allowanceTypeForAdd.value;
      allowance.name = this.allowanceTypes
        .filter((x) => x.id == this.form.controls.allowanceTypeForAdd.value)
        .map((x) => x.name)
        .toString();
      allowance.value = this.form.controls.allowanceValueForAdd.value;
      this.addedAllowanceTypes.push(allowance);
      this.table.dataSource = this.addedAllowanceTypes;
      this.table.renderRows();
    }
  }

  deleteAllowance(row: any) {
    const index = this.addedAllowanceTypes.indexOf(row, 0);

    if (index > -1) {
      this.addedAllowanceTypes.splice(index, 1);
    }
    this.table.renderRows();
  }

  closeAddEmployeeDialog() {
    this.addEmployeeDialogRef.close(this.data);
  }

  openLoadingDialog(message: string) {
    this.loadingDialogRef = this.dialog.open(LoadingDialogComponent, {
      disableClose: true,
      data: {
        message: message,
      },
    });
  }

  closeLoadingDialog() {
    this.loadingDialogRef.close();
  }

  // closeLoadingDialog() {
  //   this.dialog.closeAll();
  // }
}
