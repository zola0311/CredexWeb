import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GlobalVariables } from 'src/app/helpers/globalVariables/global-variables';
import { Users } from 'src/app/models/usersModel/users.model';

const baseUrl = GlobalVariables.apiURL + "Users";

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Users[]> {
    return this.http.get<Users[]>(baseUrl);
  }

  get(id: any): Observable<Users> {
    return this.http.get<Users>(`${baseUrl}/${id}`);
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

  findByTitle(title: any): Observable<Users[]> {
    return this.http.get<Users[]>(`${baseUrl}?title=${title}`);
  }
}
