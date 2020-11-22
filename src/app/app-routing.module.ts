import { CommentComponent } from './article/comment/comment.component';
import { DetailArticleComponent } from './article/detail-article/detail-article.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { NewArticleComponent } from './article/new-article/new-article.component';
import { LoginComponent } from './auth/login/login.component';
import { RegistrationComponent } from './auth/registration/registration.component';
import { FeedComponent } from './feed/feed/feed.component';
import { SettingComponent } from './user/setting/setting.component';
import { UserComponent } from './user/user/user.component';
import { Observable } from 'rxjs';
import { ExitFormGuard } from './guard/exit-form.guard';
import { UserModule } from './user/user.module';


const route: Routes = [
  {
    path: '',
    component: FeedComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'sign-up',
    component: RegistrationComponent,
  },
  {
    path: 'user',
    loadChildren: () => import('./user/user.module').then( m => m.UserModule)

  },
  {
    path: 'article',
    loadChildren: () => import('./article/article.module').then(m => m.ArticleModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(route)],
  exports: [RouterModule],
  providers: [ExitFormGuard]
})
export class AppRoutingModule { }
