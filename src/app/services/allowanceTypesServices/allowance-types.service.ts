import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GlobalVariables } from 'src/app/helpers/globalVariables/global-variables';
import { AllowanceTypes } from 'src/app/models/allowanceTypesModel/allowance-types.model';

const baseUrl = GlobalVariables.apiURL + "AllowanceTypes";

@Injectable({
  providedIn: 'root'
})
export class AllowanceTypesService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<AllowanceTypes[]> {
    return this.http.get<AllowanceTypes[]>(baseUrl);
  }

  get(id: any): Observable<AllowanceTypes> {
    return this.http.get(`${baseUrl}/${id}`);
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

  findByTitle(title: any): Observable<AllowanceTypes[]> {
    return this.http.get<AllowanceTypes[]>(`${baseUrl}?title=${title}`);
  }
}
