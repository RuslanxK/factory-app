import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from '../user';
import { UtilsService } from '../utils.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  sub: Subscription = new Subscription();
  displayLogin: boolean = true;
  displayRegister: boolean = false;
  loginMessage: boolean = false;
  existingMessage: boolean = false;
  unableLogin: boolean = false;
  user: any = { username: '', password: '' };
  newUser: any = { fullname: '', username: '', password: '', actions: 5 };
  users: User[] = [];
  timeLeft: number = 60;
  LoginAgain: boolean = false;
  interval: any;

  constructor(private service: UtilsService, private router: Router) {}

  displayForm() {
    this.displayLogin = !this.displayLogin;
    this.displayRegister = !this.displayRegister;
  }

  login() {
    const foundUser = this.users.find(
      (u: User) =>
        u.username === this.user.username && u.password === this.user.password
    );

    if (foundUser && foundUser.actions >= 1) {
      sessionStorage.setItem('fullname', foundUser.fullname);
      sessionStorage.setItem('actions', foundUser.actions);
      sessionStorage.setItem('user', JSON.stringify(foundUser));
      this.router.navigate(['/app/employees']);
    } else if (!foundUser) {
      this.loginMessage = true;
      this.unableLogin = false;
    } else if (foundUser && foundUser.actions < 1) {
      this.unableLogin = true;
      this.loginMessage = false;
    }
  }

  register() {
    if (
      this.newUser.fullname.length >= 5 &&
      this.newUser.username.length >= 4 &&
      this.newUser.password.length >= 6
    ) {
      const existingUser = this.users.find(
        (user: User) =>
          user.username == this.newUser.username &&
          user.password == this.newUser.password
      );

      if (!existingUser) {
        this.service
          .AddUser(this.newUser)
          .subscribe(() => console.log('Added'));
        this.displayLogin = !this.displayLogin;
        this.displayRegister = !this.displayRegister;

        window.location.reload();
      } else {
        this.existingMessage = true;
      }
    }
  }

  ngOnInit(): void {
    let currentUrl = window.location.href;
    let tmpVar = currentUrl.includes('/');
    if (currentUrl.includes('/')) {
      window.onpopstate = function (event) {
        history.go(1);
      };
    }

    this.sub = this.service.getAllUsers().subscribe((data: any) => {
      this.users = data;

      const NoActionsUser = this.users.find((user: User) => user.actions === 0);

      if (NoActionsUser) {
        this.interval = setInterval(() => {
          if (this.timeLeft > 0) {
            this.timeLeft--;
          } else {
            clearInterval(this.interval);
            const obj = { actions: 5 };
            this.service.updateUser(NoActionsUser._id, obj).subscribe(() => {});
            this.LoginAgain = true;
            this.unableLogin = false;
            this.ngOnInit();
          }
        }, 1000);
      }
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
