import { Injectable } from '@angular/core';
import { Users } from 'src/app/models/usersModel/users.model';

@Injectable({
  providedIn: 'root'
})
export class LoggedUserService {

  constructor() { }

  loggedUser: Users;

  setLoggedUser(user: Users) {
    this.loggedUser = user;
  }

  getLoggedUser(): Users {
    return this.loggedUser;
  }
}
