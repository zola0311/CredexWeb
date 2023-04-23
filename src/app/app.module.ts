import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmployeesComponent } from './components/employeesComponents/employees/employees.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MAT_DATE_LOCALE } from '@angular/material/core';

// Material Form Controls
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
// Material Navigation
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
// Material Layout
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatListModule } from '@angular/material/list';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTreeModule } from '@angular/material/tree';
// Material Buttons & Indicators
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatBadgeModule } from '@angular/material/badge';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
// Material Popups & Modals
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
// Material Data tables
import { MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { HomePageComponent } from './components/homePage/home-page/home-page.component';
import { LoadingDialogComponent } from './components/dialogs/loading-dialog/loading-dialog.component';
import { EmployeeAddDialogComponent } from './components/dialogs/employee-add-dialog/employee-add-dialog.component';
import { EmployeeEditDialogComponent } from './components/dialogs/employee-edit-dialog/employee-edit-dialog.component';
import { getHungarianPaginatorIntl } from './helpers/paginatorHungarianLanguage/paginator-hungarian-language';
import { EmployeeDeletedDialogComponent } from './components/dialogs/employee-deleted-dialog/employee-deleted-dialog.component';
import { EmployeeDeleteDialogComponent } from './components/dialogs/employee-delete-dialog/employee-delete-dialog.component';
import { EmployeeManageComponent } from './components/employeesComponents/employee-manage/employee-manage.component';
import { EmployeeDetailsComponentsComponent } from './components/employeesComponents/employee-details-components/employee-details-components.component';
import { AbsenceAddDialogComponent } from './components/dialogs/absence-add-dialog/absence-add-dialog.component';
import { AbsenceEditDialogComponent } from './components/dialogs/absence-edit-dialog/absence-edit-dialog.component';
import { AbsenceDeleteDialogComponent } from './components/dialogs/absence-delete-dialog/absence-delete-dialog.component';
import { AbsenceTypesComponent } from './components/absenceTypesComponents/absence-types/absence-types.component';
import { AbsenceTypeAddDialogComponent } from './components/dialogs/absence-type-add-dialog/absence-type-add-dialog.component';
import { AbsenceTypeEditDialogComponent } from './components/dialogs/absence-type-edit-dialog/absence-type-edit-dialog.component';
import { AbsenceTypeDeleteDialogComponent } from './components/dialogs/absence-type-delete-dialog/absence-type-delete-dialog.component';
import { StatusesComponent } from './components/statusesComponents/statuses/statuses.component';
import { StatusesAddDialogComponent } from './components/dialogs/statuses-add-dialog/statuses-add-dialog.component';
import { StatusesEditDialogComponent } from './components/dialogs/statuses-edit-dialog/statuses-edit-dialog.component';
import { StatusesDeleteDialogComponent } from './components/dialogs/statuses-delete-dialog/statuses-delete-dialog.component';
import { JobsComponent } from './components/jobsComponents/jobs/jobs.component';
import { JobAddDialogComponent } from './components/dialogs/job-add-dialog/job-add-dialog.component';
import { JobEditDialogComponent } from './components/dialogs/job-edit-dialog/job-edit-dialog.component';
import { JobDeleteDialogComponent } from './components/dialogs/job-delete-dialog/job-delete-dialog.component';
import { CookieService } from 'ngx-cookie-service';
import { LoginDialogComponent } from './components/dialogs/login-dialog/login-dialog.component';
import { UsersComponent } from './components/usersComponents/users/users.component';
import { UserAddDialogComponent } from './components/dialogs/user-add-dialog/user-add-dialog.component';
import { UserEditDialogComponent } from './components/dialogs/user-edit-dialog/user-edit-dialog.component';
import { UserDeleteDialogComponent } from './components/dialogs/user-delete-dialog/user-delete-dialog.component';
import { MonthlyStatementDialogComponent } from './components/dialogs/monthly-statement-dialog/monthly-statement-dialog.component';
import { EmployeeAbsenceComponentsComponent } from './components/employeesComponents/employee-absence-components/employee-absence-components.component';

@NgModule({
  declarations: [
    AppComponent,
    EmployeesComponent,
    HomePageComponent,
    LoadingDialogComponent,
    EmployeeAddDialogComponent,
    EmployeeEditDialogComponent,
    EmployeeDeletedDialogComponent,
    EmployeeDeleteDialogComponent,
    EmployeeManageComponent,
    EmployeeDetailsComponentsComponent,
    EmployeeAbsenceComponentsComponent,
    AbsenceAddDialogComponent,
    AbsenceEditDialogComponent,
    AbsenceDeleteDialogComponent,
    AbsenceTypesComponent,
    AbsenceTypeAddDialogComponent,
    AbsenceTypeEditDialogComponent,
    AbsenceTypeDeleteDialogComponent,
    StatusesComponent,
    StatusesAddDialogComponent,
    StatusesEditDialogComponent,
    StatusesDeleteDialogComponent,
    JobsComponent,
    JobAddDialogComponent,
    JobEditDialogComponent,
    JobDeleteDialogComponent,
    LoginDialogComponent,
    UsersComponent,
    UserAddDialogComponent,
    UserEditDialogComponent,
    UserDeleteDialogComponent,
    MonthlyStatementDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatAutocompleteModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatSelectModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatMenuModule,
    MatSidenavModule,
    MatToolbarModule,
    MatCardModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatListModule,
    MatStepperModule,
    MatTabsModule,
    MatTreeModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatBadgeModule,
    MatChipsModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatRippleModule,
    MatBottomSheetModule,
    MatDialogModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  exports: [
    MatAutocompleteModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatSelectModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatMenuModule,
    MatSidenavModule,
    MatToolbarModule,
    MatCardModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatListModule,
    MatStepperModule,
    MatTabsModule,
    MatTreeModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatBadgeModule,
    MatChipsModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatRippleModule,
    MatBottomSheetModule,
    MatDialogModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  providers: [
    { provide: MatPaginatorIntl, useValue: getHungarianPaginatorIntl() },
    { provide: MAT_DATE_LOCALE, useValue: 'hu-HU' },
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
