import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReplaySubject, Subject } from 'rxjs';
import { SettingFormValue } from '../interface/currentUser.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  userName: string;
  isLoged: boolean;
  url = 'https://conduit.productionready.io/';

  isLoginChange: Subject<boolean> = new Subject<boolean>();
  userNameChange: Subject<string> = new Subject<string>();

  constructor(private httpClient: HttpClient) {
    this.isLoginChange.subscribe((value) => {
      this.isLoged = value;
    });
    this.userNameChange.subscribe((newUsername) => {
      this.userName = newUsername;
    });
  }

  changeLoginState(): void {
    this.isLoginChange.next(!this.isLoged);
  }
  changeUsername(newUsername): void {
    this.userNameChange.next(newUsername);
    localStorage.setItem('username', newUsername);
  }
  // dung cho load setting data
  getCurrentUser(token): any {
    return this.httpClient.get(this.url + 'api/user', {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
  }

  updateUser(formValue: SettingFormValue, token): any {
    const body = {
      user: {
        username: formValue.username,
        email: formValue.email,
        image: formValue.image,
        bio: formValue.bio,
      },
    };
    if (formValue.password) {
      // tslint:disable-next-line:no-string-literal
      body.user['password'] = formValue.password;
    }
    return this.httpClient.put(this.url + 'api/user', body, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
  }
  // load trang user
  getProfile(username, token): any {
    if (token) {
      return this.httpClient.get(this.url + `api/profiles/${username}`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
    }
    return this.httpClient.get(this.url + `api/profiles/${username}`);
  }

  getListProfile(username, token, pageSize, page, currentTab): any {
    const params = {
      limit: '' + pageSize,
      offset: '' + (page - 1) * pageSize,
      author: '',
      favorited: '',
    };

    if (currentTab === 'My Articles') {
      params.author = username;
    } else {
      params.favorited = username;
    }

    const options = {
      params
    };

    if (token){
      // tslint:disable-next-line:no-string-literal
      options['headers'] = {
        Authorization: `Token ${token}`,
      };
    }
    return this.httpClient.get(this.url + 'api/articles', options);
  }

  follow(username, token): any {
    return this.httpClient.post(
      this.url + `/api/profiles/${username}/follow`,
      {},
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    );
  }
  unFollow(username, token): any{
    return this.httpClient.delete(
      this.url + `/api/profiles/${username}/follow`,
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    );
  }
}
