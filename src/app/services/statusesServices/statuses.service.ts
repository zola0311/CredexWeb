import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GlobalVariables } from 'src/app/helpers/globalVariables/global-variables';
import { Statuses } from 'src/app/models/statusesModel/statuses.model';

const baseUrl = GlobalVariables.apiURL + "Statuses";

@Injectable({
  providedIn: 'root'
})
export class StatusesService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Statuses[]> {
    return this.http.get<Statuses[]>(baseUrl);
  }

  get(id: any): Observable<Statuses> {
    return this.http.get<Statuses>(`${baseUrl}/${id}`);
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

  findByTitle(title: any): Observable<Statuses[]> {
    return this.http.get<Statuses[]>(`${baseUrl}?title=${title}`);
  }
}
