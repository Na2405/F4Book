import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ArticleService } from 'src/app/article/article.service';
import { AuthService } from 'src/app/auth/auth.service';
import { PaginationComponent } from 'src/app/share/pagination/pagination.component';
import { Articles, Article } from '../article.model';
import { FeedService } from '../feed.service';
import { Tag } from './tag.model';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css'],
})
export class FeedComponent implements OnInit {
  page = 1;
  pageSize = 10;
  listTab: string[] = ['Global Feed'];
  articleCount: number;
  currentTab: string;
  tags: string[];

  articles: Articles;
  tagEvent: string;
  tagActicle: string[][];

  constructor(
    private feedService: FeedService,
    private articleService: ArticleService,
    private authService: AuthService,
    private router: Router
  ) {
    if (localStorage.getItem('token')){
      this.listTab.unshift('Your Feed');
    }
    this.currentTab = this.listTab[0];
    this.getListArticleResponse(1, '', this.currentTab);

    // show tags
    this.feedService.getListTag().subscribe((tg: Tag) => {
      this.tags = tg.tags;
    });
  }

  ngOnInit(): void {}

  // show article by tag thay doi giua tag component va list article
  showArticleByTag(tag: string): void {
    this.tagEvent = tag;
    if (this.listTab[this.listTab.indexOf('Global Feed') + 1]) {
      this.listTab.pop();
    }
    this.currentTab = tag;
    this.listTab.push(`#${tag}`);
    this.feedService.changeTag(`#${tag}`);
    this.page = 1;
    this.getListArticleResponse(1, tag, this.currentTab);
  }

  getListArticleResponse(page, tag, currentTab): void {
    if (this.articles){
      this.articles = undefined;
    }

    if (currentTab === 'Your Feed'){
      this.feedService.getFeed(localStorage.getItem('token'), this.page, this.pageSize).subscribe((feed: Articles) => {
        this.articles = feed;
        this.articleCount = feed.articlesCount;
      });
    } else {
      this.feedService
        .getArticleByTag(page, this.pageSize, tag, localStorage.getItem('token'))
        .subscribe((tg: Articles) => {
          this.articles = tg;
          this.articleCount = tg.articlesCount;
        });
    }
  }

  handlePageChange(page: number): void {
    this.page = page;
    this.getListArticleResponse(page, this.tagEvent, this.currentTab);
  }

  changeTab(event): void {
    this.page = 1;
    if (event === 'Your Feed' || event === 'Global Feed'){
      this.tagEvent = '';
      this.currentTab = event;
      this.getListArticleResponse(1, '', this.currentTab);
    } else {
      this.currentTab = event.substring(1);
      this.getListArticleResponse(1, this.currentTab, this.currentTab);
    }
  }

  addFavorite(slug): void {
    // this.authService.navigateIfNotLoged();
    if (!localStorage.getItem('token')){
      this.router.navigate(['/', 'login']);
      return;
    }
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.articles.articles.length; i++) {
      if (this.articles.articles[i].slug === slug) {
        this.articles.articles[i].favorited = true;
        this.articles.articles[i].favoritesCount += 1;
      }
    }
    this.articleService
      .addFavorite(slug, localStorage.getItem('token'))
      .subscribe();
  }

  deleteFavorite(slug): void{
    if (!localStorage.getItem('token')){
      this.router.navigate(['/', 'login']);
      return;
    }
    this.authService.navigateIfNotLoged();
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.articles.articles.length; i++) {
      if (this.articles.articles[i].slug === slug) {
        this.articles.articles[i].favorited = false;
        this.articles.articles[i].favoritesCount -= 1;
      }
    }

    this.articleService
      .deleteFavorite(slug, localStorage.getItem('token'))
      .subscribe();
  }
}
