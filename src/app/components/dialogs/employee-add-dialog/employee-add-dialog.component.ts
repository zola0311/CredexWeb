import {
  ChangeDetectorRef,
  Component,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  Form,
  FormArray,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { element } from 'protractor';
import { AddEmployeeInterface } from 'src/app/interfaces/add-employee-interface';
import { AllowancesOfEmployees } from 'src/app/models/allowancesOfEmployeesModel/allowances-of-employees.model';
import { AllowanceTypes } from 'src/app/models/allowanceTypesModel/allowance-types.model';
import { Employees } from 'src/app/models/employeesModel/employees.model';
import { Genders } from 'src/app/models/gendersModel/genders.model';
import { Jobs } from 'src/app/models/jobsModel/jobs.model';
import { Statuses } from 'src/app/models/statusesModel/statuses.model';
import { AllowanceTypesViewModel } from 'src/app/models/viewModels/allowanceTypesViewModel/allowance-types-view-model.model';
import { AllowancesOfEmployeesService } from 'src/app/services/allowancesOfEmployeesServices/allowances-of-employees.service';
import { AllowanceTypesService } from 'src/app/services/allowanceTypesServices/allowance-types.service';
import { GendersService } from 'src/app/services/gendersServices/genders.service';
import { JobsService } from 'src/app/services/jobsServices/jobs.service';
import { StatusesService } from 'src/app/services/statusesServices/statuses.service';
import { LoadingDialogComponent } from '../loading-dialog/loading-dialog.component';

@Component({
  selector: 'app-employee-add-dialog',
  templateUrl: './employee-add-dialog.component.html',
  styleUrls: ['./employee-add-dialog.component.scss'],
})
export class EmployeeAddDialogComponent implements OnInit {
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
  @ViewChild('table') table: MatTable<AllowanceTypesViewModel>;
  constructor(
    private formBuilder: FormBuilder,
    private statusesService: StatusesService,
    private jobsService: JobsService,
    private gendersService: GendersService,
    private allowanceTypesService: AllowanceTypesService,
    private addEmployeeDialogRef: MatDialogRef<EmployeeAddDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AddEmployeeInterface
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
  }

  addEmployee(): void {
    this.submitted = true;
    if (this.addedAllowanceTypes.length == 0) {
      this.addedAllowancesIsNotNull = false;
    } else {
      this.addedAllowancesIsNotNull = true;
    }
    if (this.form.valid && this.addedAllowancesIsNotNull == true) {
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
}
