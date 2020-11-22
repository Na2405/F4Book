import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, Routes } from '@angular/router';
import { UserService } from '../user.service';
import { CurrentUser } from './../../interface/currentUser.model';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class SettingComponent {
  settingForm: FormGroup;
  constructor(private userService: UserService,
              private router: Router,
              private fb: FormBuilder) {
    const token = localStorage.getItem('token');
    if (!localStorage.getItem('token')){
      this.router.navigate(['/', 'login']);
      return;
    }
    this.settingForm = fb.group({
      image: [''],
      username: ['', Validators.required],
      bio: [''],
      email: ['', [Validators.required, Validators.email]],
      password: ['']
    });
    this.userService.getCurrentUser(token).subscribe((User: CurrentUser) => {
      this.settingForm = fb.group({
        image: [User.user.image],
        username: [User.user.username, Validators.required],
        bio: [User.user.bio],
        email: [User.user.email, [Validators.required, Validators.email]],
        password: ['']
      });
    });
  }

  saveSetting(): void{
    this.userService.updateUser(this.settingForm.value, localStorage.getItem('token')).subscribe((user: CurrentUser) => {
      this.userService.changeUsername(this.settingForm.value.username);
      this.router.navigate(['user', user.user.username]);
    });
  }

}
