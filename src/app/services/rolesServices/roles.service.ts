import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GlobalVariables } from 'src/app/helpers/globalVariables/global-variables';
import { Roles } from 'src/app/models/rolesModel/roles.model';

const baseUrl = GlobalVariables.apiURL + "Roles";

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Roles[]> {
    return this.http.get<Roles[]>(baseUrl);
  }

  get(id: any): Observable<Roles> {
    return this.http.get<Roles>(`${baseUrl}/${id}`);
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

  findByTitle(title: any): Observable<Roles[]> {
    return this.http.get<Roles[]>(`${baseUrl}?title=${title}`);
  }
}
