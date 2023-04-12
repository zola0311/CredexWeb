import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GlobalVariables } from 'src/app/helpers/globalVariables/global-variables';
import { AbsencesTypes } from 'src/app/models/absencesTypesModel/absences-types.model';

const baseUrl = GlobalVariables.apiURL + "AbsencesTypes";

@Injectable({
  providedIn: 'root'
})
export class AbsenceTypesService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<AbsencesTypes[]> {
    return this.http.get<AbsencesTypes[]>(baseUrl);
  }

  get(id: number): Observable<AbsencesTypes> {
    return this.http.get<AbsencesTypes>(`${baseUrl}/${id}`);
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
