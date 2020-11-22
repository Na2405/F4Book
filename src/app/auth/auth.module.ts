import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { ParticlesModule } from 'angular-particle';

@NgModule({
  declarations: [LoginComponent, RegistrationComponent],
  imports: [CommonModule, FormsModule, HttpClientModule, ParticlesModule],
})
export class AuthModule {}
