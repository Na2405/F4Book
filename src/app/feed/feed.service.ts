import { HttpClient } from '@angular/common/http';
import { variable } from '@angular/compiler/src/output/output_ast';
import { Injectable } from '@angular/core';
import { ReplaySubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FeedService {
  listArticleUrl = 'https://conduit.productionready.io/api/articles';
  tagUrl = 'https://conduit.productionready.io/api/tags';
  currentTag: string;

  isTagChange: ReplaySubject<string> = new ReplaySubject<string>();
  constructor(private http: HttpClient) {
    this.isTagChange.subscribe((tag) => {
      this.currentTag = tag;
    });
  }

  changeTag(tag): void{
    this.isTagChange.next(tag);
  }

  getListTag(): any {
    return this.http.get(this.tagUrl);
  }

  //
  getArticleByTag(page: number, pageSize: number, tag: string, token: string): any {
    if (token) {
      return this.http.get(this.listArticleUrl, {
        headers: {
          Authorization: `Token ${token}`,
        },
        params: {
          tag,
          author: '',
          favorited: '',
          limit: '' + pageSize,
          offset: '' + (page - 1) * pageSize,
        },
      });
    }
    return this.http.get(this.listArticleUrl, {
      params: {
        tag,
        author: '',
        favorited: '',
        limit: '' + pageSize,
        offset: '' + (page - 1) * pageSize,
      },
    });
  }

  getFeed(token, page, pageSize): any{
    return this.http.get(this.listArticleUrl + '/feed', {
      headers: {
        Authorization: `Token ${token}`,
      },
      params: {
        author: '',
        favorited: '',
        limit: '' + pageSize,
        offset: '' + (page - 1) * pageSize,
      }
    });
  }
}
