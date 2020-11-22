import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';
import { SettingComponent } from '../user/setting/setting.component';

@Injectable({
  providedIn: 'root'
})
export class ExitFormGuard implements CanDeactivate<SettingComponent> {
  canDeactivate(component: SettingComponent,
                currentRoute: ActivatedRouteSnapshot,
                currentState: RouterStateSnapshot,
                nextState?: RouterStateSnapshot): boolean {
    if (component.settingForm.dirty){
      return confirm('You have some unsaved change, do you want to exit');
    }
    return true;
  }
}
