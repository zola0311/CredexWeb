import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CookieService } from 'ngx-cookie-service';
import { LoginDialogComponent } from './components/dialogs/login-dialog/login-dialog.component';
import { Users } from './models/usersModel/users.model';
import { GlobalVariables } from './helpers/globalVariables/global-variables';
import { LoggedUserService } from './services/loggedUserServices/logged-user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Credex';
  userIsLoggedInCookie: string = "";
  userIsLoggedIn: boolean = false;
  user: Users;
  constructor(private cookieService: CookieService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.getUserLoggedInCookie();
    this.checkUserIsLoggedIn();
  }

  logOff(): void {
    this.userIsLoggedIn = false;
    this.cookieService.set('userLoggedIn', 'false');
    this.openLoginDialog();
  }

  getUserLoggedInCookie(): void {
    this.userIsLoggedInCookie = this.cookieService.get('userLoggedIn');
  }

  checkUserIsLoggedIn(): void {
    if(this.userIsLoggedInCookie == "" || this.userIsLoggedInCookie == "false") {
      this.userIsLoggedIn = false;
      this.openLoginDialog();
    }
    else {
      this.userIsLoggedIn = true;
    }
  }

  openLoginDialog(): void {
    const dialogRef = this.dialog.open(LoginDialogComponent, {
      disableClose: true,
      width: '500px',
      height: '550px',
      data: {
        user: Users,
        loggedIn: false,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if(result.loggedIn) {
        this.user = result.user;
        this.userIsLoggedIn = true;
        this.cookieService.set('userLoggedIn', 'true');
      }
    });
  }
}
