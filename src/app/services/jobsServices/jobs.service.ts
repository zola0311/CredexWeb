import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GlobalVariables } from 'src/app/helpers/globalVariables/global-variables';
import { Jobs } from 'src/app/models/jobsModel/jobs.model';

const baseUrl = GlobalVariables.apiURL + "Jobs";

@Injectable({
  providedIn: 'root'
})
export class JobsService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Jobs[]> {
    return this.http.get<Jobs[]>(baseUrl);
  }

  get(id: any): Observable<Jobs> {
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

  findByTitle(title: any): Observable<Jobs[]> {
    return this.http.get<Jobs[]>(`${baseUrl}?title=${title}`);
  }
}
