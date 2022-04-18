import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router, private http: HttpClient) { }

  token: any = localStorage.getItem('token') ? localStorage.getItem('token') : null;
  active_user: any;

  login(email: any, password: any) {

    const params = {
      email: email,
      password: password
    };

    this.http.post<any>('http://localhost:3000/api/users/login', params)
      .subscribe({
        next: data => {
          this.setToken(data.token);
          this.setActiveUser(data.user);
          this.router.navigate(['/dashboard']);
        },
        error: error => {
          console.error('There was an error!', error);
          console.log('Invalid Credentials');
        }
      });
  }

  register(registerForm: any) {
    const params = {
      name: registerForm.name,
      email: registerForm.email,
      password: registerForm.password,
      age: registerForm.age
    };

    this.http.post<any>('http://localhost:3000/api/users', params)
      .subscribe({
        next: data => {
          this.router.navigate(['/']);
        },
        error: error => {
          console.error('There was an error!', error);
          console.log('Invalid Records');
        }
      });
  }

  logout(){
    localStorage.removeItem('token');
    this.token = null;
    this.active_user = null;
    this.router.navigate(['/login']);
  }

  setToken(token: string) {
    localStorage.setItem('token', token);
    this.token = token;
  }

  setActiveUser(usersdata: any) {
    this.active_user = usersdata;
  }
}
