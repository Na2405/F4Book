import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeedComponent } from './feed/feed.component';
import { HttpClientModule } from '@angular/common/http';
import { ShareModule } from '../share/share.module';
import { RouterModule } from '@angular/router';
// import { ListArticleComponent } from '../share/list-article/list-article.component';

@NgModule({
  declarations: [FeedComponent],
  imports: [CommonModule, HttpClientModule, ShareModule, RouterModule],
  exports: [FeedComponent],
})
export class FeedModule { }
