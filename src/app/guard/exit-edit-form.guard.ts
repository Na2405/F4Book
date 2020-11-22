import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';
import { NewArticleComponent } from '../article/new-article/new-article.component';

@Injectable({
  providedIn: 'root'
})
export class ExitEditFormGuard implements CanDeactivate<NewArticleComponent> {
  canDeactivate(component: NewArticleComponent,
                currentRoute: ActivatedRouteSnapshot,
                currentState: RouterStateSnapshot,
                nextState?: RouterStateSnapshot): boolean{
    if (component.contact.dirty && !component.isSubmitting){
      return confirm('You have some unsaved change, do you want to exit');
    }
    return true;
  }

}
