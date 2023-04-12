import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GlobalVariables } from 'src/app/helpers/globalVariables/global-variables';
import { AbsencesOfEmployees } from 'src/app/models/absencesOfEmployeesModel/absences-of-employees.model';

const baseUrl = GlobalVariables.apiURL + "AbsencesOfEmployees";

@Injectable({
  providedIn: 'root'
})
export class AbsencesOfEmployeesService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<AbsencesOfEmployees[]> {
    return this.http.get<AbsencesOfEmployees[]>(baseUrl);
  }

  get(id: number): Observable<AbsencesOfEmployees> {
    return this.http.get<AbsencesOfEmployees>(`${baseUrl}/${id}`);
  }

  getEmployeeAbsences(employeeId: number): Observable<AbsencesOfEmployees[]> {
    return this.http.get<AbsencesOfEmployees[]>(`${baseUrl}/getEmployeeAbsences/${employeeId}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }
}
