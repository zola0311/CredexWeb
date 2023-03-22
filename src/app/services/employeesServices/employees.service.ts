import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GlobalVariables } from 'src/app/helpers/globalVariables/global-variables';
import { Employees } from 'src/app/models/employeesModel/employees.model';
import { AllowancesOfEmployees } from 'src/app/models/allowancesOfEmployeesModel/allowances-of-employees.model';
import { EmployeeAndAllowancesOfEmployees } from 'src/app/models/employeeAndAllowancesOfEmployees/employee-and-allowances-of-employees.model';

const baseUrl = GlobalVariables.apiURL + 'Employees';

@Injectable({
  providedIn: 'root',
})
export class EmployeesService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<Employees[]> {
    return this.http.get<Employees[]>(baseUrl);
  }

  get(id: any): Observable<Employees> {
    return this.http.get<Employees>(`${baseUrl}/${id}`);
  }

  getDeletedEmployees(): Observable<Employees[]> {
    return this.http.get<Employees[]>(`${baseUrl}/getDeletedEmployees`);
  }

  restoreEmployee(employeeId: number, employee: Employees): Observable<any> {
    return this.http.put<any>(`${baseUrl}/restoreEmployee/${employeeId}`, employee);
  }

  deleteEmployee(employeeId: number, employee: Employees): Observable<any> {
    return this.http.put<any>(`${baseUrl}/deleteEmployee/${employeeId}`, employee);
  }

  create(data: any): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  update(
    id: any,
    employeeAndAllowancesOfEmployees: EmployeeAndAllowancesOfEmployees
  ): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, employeeAndAllowancesOfEmployees);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(baseUrl);
  }

  findByTitle(title: any): Observable<Employees[]> {
    return this.http.get<Employees[]>(`${baseUrl}?title=${title}`);
  }
}
