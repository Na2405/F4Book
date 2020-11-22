import { DetailArticleComponent } from './detail-article/detail-article.component';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentComponent } from './comment/comment.component';

import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NewArticleComponent } from './new-article/new-article.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ExitEditFormGuard } from '../guard/exit-edit-form.guard';
import { ShareModule } from '../share/share.module';

const routes: Routes = [{
  path: 'newArticle',
  component: NewArticleComponent,
  canDeactivate: [ExitEditFormGuard]
},
{
  path: 'detail/:slug',
  component: DetailArticleComponent
},
{
  path: 'edit/:slug',
  component: NewArticleComponent,
  canDeactivate: [ExitEditFormGuard]
}];

@NgModule({
  declarations: [CommentComponent, DetailArticleComponent, NewArticleComponent],
  imports: [CommonModule, HttpClientModule, ReactiveFormsModule, RouterModule, FormsModule, RouterModule.forChild(routes), ShareModule],
})
export class ArticleModule { }
