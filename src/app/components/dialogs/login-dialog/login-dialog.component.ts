import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { LoginUserInterface } from 'src/app/interfaces/login-user-interface';
import { Users } from 'src/app/models/usersModel/users.model';
import { UsersService } from 'src/app/services/usersServices/users.service';
import { Md5 } from 'ts-md5';

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.scss'],
})
export class LoginDialogComponent implements OnInit {
  form: FormGroup;
  users: Users[] = [];
  user: Users = {
    id: 0,
    email: null,
    password: null,
    roleId: 0,
    roles: null,
  };
  userNotFound: boolean = false;
  constructor(
    private loginDialogRef: MatDialogRef<LoginDialogComponent>,
    private usersService: UsersService,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: LoginUserInterface
  ) {
    this.form = this.formBuilder.group({
      email: [null, Validators.required],
      password: [null, Validators.required],
    });
  }

  ngOnInit(): void {
    this.getUsers();
  }

  get getControl() {
    return this.form.controls;
  }

  getUsers(): void {
    this.usersService.getAll().subscribe(
      (data) => {
        this.users = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  login(): void {
    const md5 = new Md5();
    if (this.form.valid) {
      var user = this.users.filter(
        (x) =>
          x.email.toLowerCase().match(this.form.controls.email.value) &&
          x.password
            .toLowerCase()
            .match(
              md5.appendStr(this.form.controls.password.value).end().toString()
            )
      );
      if (user.length > 0) {
        this.data.loggedIn = true;
        this.loginDialogRef.close(this.data);
      } else {
        this.userNotFound = true;
      }
    } else {
      Object.keys(this.form.controls).forEach((field) => {
        const control = this.form.get(field);
        control.markAsTouched({ onlySelf: true });
      });
    }
  }
}
