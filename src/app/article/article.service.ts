import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  // slug: string;

  constructor(private http: HttpClient) {}

  createArticle(formValue, token: string, tagList): any {
    console.log(formValue.tagList);
    if (formValue) {
      return this.http.post(
        'https://conduit.productionready.io/api/articles',
        {
          article: {
            title: formValue.title,
            description: formValue.description,
            body: formValue.body,
            tagList,
          },
        },
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
    }
  }

  updateArticle(formValue, token: string, slug: string): any {
    return this.http.put(
      `https://conduit.productionready.io/api/articles/${slug}`,
      {
        article: {
          title: formValue.title,
          description: formValue.description,
          body: formValue.body,
          tagList: formValue.tagList,
        },
      },
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    );
  }

  deleteArticle(token: string, slug: string): any {
    // console.log(this.slug);
    return this.http.delete(
      `https://conduit.productionready.io/api/articles/${slug}`,
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    );
  }

  getArticle(slug: string, token: string): any {
    if (token){
    return this.http.get(
      `https://conduit.productionready.io/api/articles/${slug}`,
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    );
    }

    return this.http.get(
      `https://conduit.productionready.io/api/articles/${slug}`);
  }

  getComments(slug: string): any {
    return this.http.get(
      `https://conduit.productionready.io/api/articles/${slug}/comments`
    );
  }

  addComments(comment: string, token: string, slug: string): any {
    return this.http.post(
      `https://conduit.productionready.io/api/articles/${slug}/comments`,
      {
        comment: {
          body: comment,
        },
      },
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    );
  }

  deleteComments(slug: string, token: string, id: number): any {
    return this.http.delete(
      `https://conduit.productionready.io/api/articles/${slug}/comments/${id}`,
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    );
  }

  addFavorite(slug: string, token: string): any {
    return this.http.post(
      `https://conduit.productionready.io/api/articles/${slug}/favorite`,
      {},
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    );
  }

  deleteFavorite(slug: string, token: string): any {
    return this.http.delete(
      `https://conduit.productionready.io/api/articles/${slug}/favorite`,
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    );
  }
}
