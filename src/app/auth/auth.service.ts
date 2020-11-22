import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient,
              private router: Router) {
    // console.log('AuthService token: ' + this.token);
  }

  navigateIfNotLoged(): any{
    if (!localStorage.getItem('token')){
      this.router.navigate(['/', 'login']);
      return;
    }
  }

  signIn(email: string, password: string): any{
    return this.http.post(
      'https://conduit.productionready.io/api/users/login',
      {
        user: {
          email,
          password,
        },
      }
    );
  }

  signUp(username: any, email: string, password: string): any{
    return this.http.post('https://conduit.productionready.io/api/users', {
      user: {
        username,
        email,
        password,
      },
    });
  }
}
