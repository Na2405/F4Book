import { MultipleComment } from './../../interface/multipleComment.model';
import { ArticleService } from './../article.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, Input, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css'],
})
export class CommentComponent implements OnInit {
  textComment: string;

  token = localStorage.getItem('token');
  currentUser = localStorage.getItem('username');
  @Input() slug: string;
  @Input() comment: Comment;
  @Output() addComment = new EventEmitter();
  @Output() deleteComment = new EventEmitter();

  constructor(
    private ac: ActivatedRoute,
    private articleService: ArticleService
  ) {}

  ngOnInit(): void {}

  postComment(): void {
    this.addComment.emit(this.textComment);
    this.textComment = '';
  }
  handleDelete(index): void {
    this.deleteComment.emit(index);
  }
}
