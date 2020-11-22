import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user/user.component';
import { SettingComponent } from './setting/setting.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { ShareModule } from '../share/share.module';
import { ExitFormGuard } from '../guard/exit-form.guard';

const routes: Routes = [{
  path: 'setting',
  component: SettingComponent,
  canDeactivate: [ExitFormGuard]
},
{
  path: ':username',
  component: UserComponent
}];

@NgModule({
  declarations: [UserComponent, SettingComponent],
  imports: [CommonModule, ReactiveFormsModule, RouterModule, ShareModule, RouterModule.forChild(routes)],
})
export class UserModule { }
