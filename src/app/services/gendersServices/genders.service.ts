import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GlobalVariables } from 'src/app/helpers/globalVariables/global-variables';
import { Genders } from 'src/app/models/gendersModel/genders.model';

const baseUrl = GlobalVariables.apiURL + "Genders";

@Injectable({
  providedIn: 'root'
})
export class GendersService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Genders[]> {
    return this.http.get<Genders[]>(baseUrl);
  }

  get(id: any): Observable<Genders> {
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

  findByTitle(title: any): Observable<Genders[]> {
    return this.http.get<Genders[]>(`${baseUrl}?title=${title}`);
  }
}
