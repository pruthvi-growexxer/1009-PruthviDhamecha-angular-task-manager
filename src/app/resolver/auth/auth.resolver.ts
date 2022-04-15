import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthService } from '../../services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthResolver implements Resolve<any> {
  constructor(
    private readonly auth:AuthService,
    private http: HttpClient
  ){

  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {

    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': "Bearer " + localStorage.getItem('token'),
    });

    this.http.get<any>('http://localhost:3000/api/users/me',{ headers: headers }).subscribe({
        next: data => {
          this.auth.setActiveUser(data);
        },
        error: error => {
          console.error('There was an error!', error);
        }
      });
      return of(true);
  }
}
