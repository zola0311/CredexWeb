import { Component, Inject, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AllowanceTypes } from 'src/app/models/allowanceTypesModel/allowance-types.model';
import { Employees } from 'src/app/models/employeesModel/employees.model';
import { Genders } from 'src/app/models/gendersModel/genders.model';
import { Jobs } from 'src/app/models/jobsModel/jobs.model';
import { Statuses } from 'src/app/models/statusesModel/statuses.model';
import { ValueStreams } from 'src/app/models/valueStreamsModel/value-streams.model';
import { AllowanceTypesViewModel } from 'src/app/models/viewModels/allowanceTypesViewModel/allowance-types-view-model.model';
import { AllowancesOfEmployeesService } from 'src/app/services/allowancesOfEmployeesServices/allowances-of-employees.service';
import { AllowanceTypesService } from 'src/app/services/allowanceTypesServices/allowance-types.service';
import { GendersService } from 'src/app/services/gendersServices/genders.service';
import { JobsService } from 'src/app/services/jobsServices/jobs.service';
import { StatusesService } from 'src/app/services/statusesServices/statuses.service';
import { ValueStreamsService } from 'src/app/services/valueStreamsServices/value-streams.service';
import { LoadingDialogComponent } from '../loading-dialog/loading-dialog.component';

@Component({
  selector: 'app-employee-add-dialog',
  templateUrl: './employee-add-dialog.component.html',
  styleUrls: ['./employee-add-dialog.component.scss']
})
export class EmployeeAddDialogComponent implements OnInit {
  form: FormGroup;
  allowanceForm: FormGroup;
  statuses: Statuses[];
  jobs: Jobs[];
  jobsOfValueStreams: Jobs[];
  valueStreams: ValueStreams[];
  genders: Genders[];
  allowanceTypes: AllowanceTypes[];
  addedAllowanceTypes: AllowanceTypesViewModel[];
  displayedColumns: string[] = ['name', 'value'];
  constructor(@Inject(MAT_DIALOG_DATA) public data: Employees, 
  private formBuilder: FormBuilder,
  private allowanceFormBuilder: FormBuilder, 
  private statusesService: StatusesService,
  private jobsService: JobsService,
  private valueStreamsService: ValueStreamsService,
  private gendersService: GendersService,
  private dialog: MatDialog,
  private allowanceOfEmployeesService: AllowancesOfEmployeesService,
  private allowanceTypesService: AllowanceTypesService) {
    this.form = this.formBuilder.group({
      name: '',
      birthName: '',
      phoneNumber: '',
      indentityCardNumber: '',
      genderId: '',
      valueStreamId: '',
      nameOfMother: '',
      postalCode: '',
      city: '',
      address: '',
      jobId: '',
      statusId: ''
    });
    this.allowanceForm = this.allowanceFormBuilder.group({
      name: '',
      value: null
    });
   }

  ngOnInit(): void {
    this.getStatuses();
    this.getJobs();
    this.getValueStreams();
    this.getGenders();
    this.getAllowanceTypes();
  }

  addAllowancesToList(): void {
    let allowance: AllowanceTypesViewModel;
    allowance.name = this.allowanceForm.controls.name.value;
    allowance.value = this.allowanceForm.controls.value.value;
    this.addedAllowanceTypes.push(allowance);
  }

  getStatuses(): void {
    this.statusesService.getAll()
      .subscribe(
        data => {
          this.statuses = data;
        },
        error => {
          console.log(error);
        }
      );
  }

  getJobs(): void {
    this.jobsService.getAll()
      .subscribe(
        data => {
          this.jobs = data;
        },
        error => {
          console.log(error);
        }
      );
  }

  getValueStreams(): void {
    this.valueStreamsService.getAll()
      .subscribe(
        data => {
          this.valueStreams = data;
        },
        error => {
          console.log(error);
        }
      );
  }

  getGenders(): void {
    this.gendersService.getAll()
      .subscribe(
        data => {
          this.genders = data;
        },
        error => {
          console.log(error);
        }
      );
  }

  getAllowanceTypes(): void {
    this.allowanceTypesService.getAll()
      .subscribe(
        data => {
          this.allowanceTypes = data;
        },
        error => {
          console.log(error);
        }
      );
  }

  getJobsOfValueStream(): void {
    this.jobsOfValueStreams = this.jobs.filter(x => x.valueStreamId == this.form.controls.valueStreamId.value);
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
