import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private router: Router, private http: HttpClient, private authService: AuthService) { }

  deleteUser() {
    const header = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.authService.token
    })

    this.http.delete<any>('http://localhost:3000/api/users/me', { headers: header })
      .subscribe({
        next: data => {
          this.authService.logout();
          this.router.navigate(['/login']);
        },
        error: error => {
          console.error('There was an error!', error);
          console.log('Invalid Credentials');
        }
      });
  }

  updateUser(user: any) {

    const params = {
      name: user.name,
      age: user.age,
    }

    const header = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.authService.token
    })

    this.http.patch<any>('http://localhost:3000/api/users/me',params, { headers: header })
      .subscribe({
        next: data => {
          this.authService.setActiveUser(data);
          this.router.navigate(['/profile']);
        },
        error: error => {
          console.error('There was an error!', error);
          console.log('Invalid Credentials');
        }
      });
  }

}
