import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GlobalVariables } from 'src/app/helpers/globalVariables/global-variables';
import { AllowancesOfEmployees } from 'src/app/models/allowancesOfEmployeesModel/allowances-of-employees.model';

const baseUrl = GlobalVariables.apiURL + "AllowancesOfEmployees";

@Injectable({
  providedIn: 'root'
})
export class AllowancesOfEmployeesService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<AllowancesOfEmployees[]> {
    return this.http.get<AllowancesOfEmployees[]>(baseUrl);
  }

  get(id: any): Observable<AllowancesOfEmployees> {
    return this.http.get<AllowancesOfEmployees>(`${baseUrl}/${id}`);
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

  deleteAll(): Observable<any> {
    return this.http.delete(baseUrl);
  }

  findByTitle(title: any): Observable<AllowancesOfEmployees[]> {
    return this.http.get<AllowancesOfEmployees[]>(`${baseUrl}?title=${title}`);
  }
}
