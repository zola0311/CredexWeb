import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EditUserInterface } from 'src/app/interfaces/edit-user-interface';
import { Roles } from 'src/app/models/rolesModel/roles.model';
import { Users } from 'src/app/models/usersModel/users.model';
import { RolesService } from 'src/app/services/rolesServices/roles.service';
import { Md5 } from 'ts-md5';

@Component({
  selector: 'app-user-edit-dialog',
  templateUrl: './user-edit-dialog.component.html',
  styleUrls: ['./user-edit-dialog.component.scss']
})
export class UserEditDialogComponent implements OnInit {
  form: FormGroup;
  roles: Roles[] = [];
  user: Users = {
    id: 0,
    email: null,
    password: null,
    roleId: 0,
    roles: null
  }
  constructor(
    private formBuilder: FormBuilder,
    private editUserDialogRef: MatDialogRef<UserEditDialogComponent>,
    private rolesService: RolesService,
    @Inject(MAT_DIALOG_DATA) public data: EditUserInterface
  ) {
    this.form = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required],
      roleId: [null, Validators.required],
    });
   }

   get getControl() {
    return this.form.controls;
  }

  ngOnInit(): void {
    this.fillForm();
    this.getRoles();
  }

  updateUser(): void {
    if(this.form.valid) {
      const md5 = new Md5();
      this.user.id = this.data.user.id;
      this.user.email = this.form.controls.email.value;
      this.user.password = md5.appendStr(this.form.controls.password.value).end().toString();
      this.user.roleId = this.form.controls.roleId.value;
      this.data.user = this.user;
      this.data.editFormSubmitted = true;
      this.closeUserDialog();
    }
  }

  fillForm(): void {
    const md5 = new Md5();
    this.form.controls.email.patchValue(this.data.user.email);
    this.form.controls.roleId.patchValue(this.data.user.roleId);
  }

  getRoles(): void {
    this.rolesService.getAll()
      .subscribe(
        data => {
          this.roles = data;
        },
        error => {
          console.log(error);
        }
      );
  }

  closeUserDialog() {
    this.editUserDialogRef.close(this.data);
  }

}
