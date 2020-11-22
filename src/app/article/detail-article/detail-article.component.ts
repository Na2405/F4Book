import { MultipleComment } from './../../interface/multipleComment.model';

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SingleArticle } from 'src/app/interface/singleArticle.model';
import { ArticleService } from '../article.service';
import { UserService } from 'src/app/user/user.service';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-detail-article',
  templateUrl: './detail-article.component.html',
  styleUrls: ['./detail-article.component.css'],
})
export class DetailArticleComponent implements OnInit {
  slug = '';
  article: SingleArticle;
  listComments: any;
  currentUser: string;

  constructor(
    private ac: ActivatedRoute,
    private router: Router,
    private articleService: ArticleService,
    private userService: UserService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.currentUser = localStorage.getItem('username');
    this.ac.params.subscribe((params) => {
      this.slug = params.slug;
      this.articleService
        .getArticle(this.slug, localStorage.getItem('token'))
        .subscribe((articlesResponse: SingleArticle) => {
          this.article = articlesResponse;
        });

      this.articleService
        .getComments(this.slug)
        .subscribe((commentsResponse: MultipleComment) => {
          this.listComments = commentsResponse.comments;
        });
    });
  }

  postCommentnew(textComment: string): void {
    // this.authService.navigateIfNotLoged();
    if (!localStorage.getItem('token')) {
      this.router.navigate(['/', 'login']);
      return;
    }
    if (textComment !== '') {
      this.articleService
        .addComments(textComment, localStorage.getItem('token'), this.slug)
        .subscribe((data) => {
          this.articleService
            .getComments(this.slug)
            .subscribe((commentsResponse: MultipleComment) => {
              this.listComments = commentsResponse.comments;
            });
        });
    }
  }

  deleteComment(id: number): void {
    // this.authService.navigateIfNotLoged();
    if (!localStorage.getItem('token')) {
      this.router.navigate(['/', 'login']);
      return;
    }
    this.articleService
      .deleteComments(this.slug, localStorage.getItem('token'), id)
      .subscribe((data) => {
        this.articleService
          .getComments(this.slug)
          .subscribe((commentsResponse: MultipleComment) => {
            this.listComments = commentsResponse.comments;
          });
      });
  }

  deleteArticle(): void {
    // this.authService.navigateIfNotLoged();
    if (!localStorage.getItem('token')) {
      this.router.navigate(['/', 'login']);
      return;
    }
    this.articleService
      .deleteArticle(localStorage.getItem('token'), this.slug)
      .subscribe((data) => {
        this.router.navigate(['/']);
      });
  }

  addFavorite(slug): void {
    // this.authService.navigateIfNotLoged();
    if (!localStorage.getItem('token')) {
      this.router.navigate(['/', 'login']);
      return;
    }
    this.article.article.favorited = true;
    this.article.article.favoritesCount += 1;
    this.articleService
      .addFavorite(slug, localStorage.getItem('token'))
      .subscribe((data) => {
        // console.log(data);
      });
  }

  deleteFavorite(slug): void {
    // this.authService.navigateIfNotLoged();
    if (!localStorage.getItem('token')) {
      this.router.navigate(['/', 'login']);
      return;
    }
    this.article.article.favorited = false;
    this.article.article.favoritesCount -= 1;
    this.articleService
      .deleteFavorite(slug, localStorage.getItem('token'))
      .subscribe((data) => {
        // console.log(data);
      });
  }

  follow(username): void {
    // this.authService.navigateIfNotLoged();
    if (!localStorage.getItem('token')) {
      this.router.navigate(['/', 'login']);
      return;
    }
    this.article.article.author.following = true;

    this.userService
      .follow(username, localStorage.getItem('token'))
      .subscribe((data) => {
        // console.log(data);
      });
  }
  unFollow(username): void {
    // this.authService.navigateIfNotLoged();
    if (!localStorage.getItem('token')) {
      this.router.navigate(['/', 'login']);
      return;
    }
    this.article.article.author.following = false;

    this.userService
      .unFollow(username, localStorage.getItem('token'))
      .subscribe((data) => {
        // console.log(data);
      });
  }
}
