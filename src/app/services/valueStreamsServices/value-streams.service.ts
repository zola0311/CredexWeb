import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GlobalVariables } from 'src/app/helpers/globalVariables/global-variables';
import { ValueStreams } from 'src/app/models/valueStreamsModel/value-streams.model';

const baseUrl = GlobalVariables.apiURL + "ValueStreams";

@Injectable({
  providedIn: 'root'
})
export class ValueStreamsService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<ValueStreams[]> {
    return this.http.get<ValueStreams[]>(baseUrl);
  }

  get(id: any): Observable<ValueStreams> {
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

  findByTitle(title: any): Observable<ValueStreams[]> {
    return this.http.get<ValueStreams[]>(`${baseUrl}?title=${title}`);
  }
}
