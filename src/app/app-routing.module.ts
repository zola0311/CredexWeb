import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeesComponent } from './components/employeesComponents/employees/employees.component';
import { HomePageComponent } from './components/homePage/home-page/home-page.component';
import { EmployeeManageComponent } from './components/employeesComponents/employee-manage/employee-manage.component';
import { AbsenceTypesComponent } from './components/absenceTypesComponents/absence-types/absence-types.component';
import { StatusesComponent } from './components/statusesComponents/statuses/statuses.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'employees', component: EmployeesComponent },
  { path: 'absenceTypes', component: AbsenceTypesComponent },
  { path: 'statuses', component: StatusesComponent },
  { path: 'employees/manage/:employeeId', component: EmployeeManageComponent },
  { path: 'home', component: HomePageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
