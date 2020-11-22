import { SingleArticle } from 'src/app/interface/singleArticle.model';

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ArticleService } from '../article.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NewArticle } from 'src/app/interface/newArticle.model';

@Component({
  selector: 'app-new-article',
  templateUrl: './new-article.component.html',
  styleUrls: ['./new-article.component.css'],
})
export class NewArticleComponent implements OnInit {
  // body: string
  // title: string
  // description: string
  // tagList: string[]

  isSubmitting = false;
  contact: FormGroup;
  errors = {};
  isEdited = false;
  slug: string;
  tagList: string[] = [];

  constructor(
    private articleService: ArticleService,
    private router: Router,
    private ac: ActivatedRoute
  ) {
    this.contact = new FormGroup({
      title: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
      ]),
      description: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
      ]),
      body: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
      ]),
      tagList: new FormControl(''),
    });
    ac.params.subscribe((params) => {
      if (params.slug) {
        this.slug = params.slug;
        this.isEdited = true;
        articleService
          .getArticle(params.slug, localStorage.getItem('token'))
          .subscribe((articleResponse: NewArticle) => {
            this.contact = new FormGroup({
              title: new FormControl(articleResponse.article.title, [
                Validators.required,
                Validators.minLength(10),
              ]),
              description: new FormControl(
                articleResponse.article.description,
                [Validators.required, Validators.minLength(10)]
              ),
              body: new FormControl(articleResponse.article.body, [
                Validators.required,
                Validators.minLength(10),
              ]),
              tagList: new FormControl(articleResponse.article.tagList),
            });
          });
      }
    });
  }

  ngOnInit(): void {}

  addNewArticle(): void {
    const token = localStorage.getItem('token');
    this.isSubmitting = true;
    if (!this.isEdited) {
      this.articleService
        .createArticle(this.contact.value, token, this.tagList)
        .subscribe((data: SingleArticle) => {
          this.router.navigate(['/', 'article', 'detail', data.article.slug]);
        });
    } else {
      this.articleService
        .updateArticle(this.contact.value, token, this.slug)
        .subscribe((data: SingleArticle) => {
          this.router.navigate(['/', 'article', 'detail', data.article.slug]);
        });
    }
  }

  // add textContent at []
  listsTag(box: string): void{
    if (box) {
      this.tagList.push(box);
    }
  }

  deleteTaglist(i): void{
    console.log(i);
    this.tagList.splice(i, 1);
  }
}
