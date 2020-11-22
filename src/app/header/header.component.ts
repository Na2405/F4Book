import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLoged: boolean;
  userName: string;

  constructor(private userService: UserService,
              private route: Router) {
    userService.isLoginChange.subscribe(value => {
      this.isLoged = value;
    });
    userService.userNameChange.subscribe((newUsername: string) => {
      this.userName = newUsername;
    });
  }

  ngOnInit(): void {
    if (localStorage.getItem('username')) {
      this.handleChangeHeader(localStorage.getItem('username'));
    }
  }

  handleLogout(): void {
    this.handleChangeHeader('');
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    this.route.navigate(['/']);
  }

  handleChangeHeader(username): void {
    this.userService.changeLoginState();
    this.userService.isLoginChange.subscribe(value => {
      this.isLoged = value;
    });
    this.userService.changeUsername(username);
    this.userService.userNameChange.subscribe((newUsername: string) => {
      this.userName = newUsername;
    });
  }
}
