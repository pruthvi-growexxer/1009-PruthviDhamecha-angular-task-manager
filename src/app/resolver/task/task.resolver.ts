import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { TaskService } from 'src/app/services/task/task.service';

@Injectable({
  providedIn: 'root'
})
export class TaskResolver implements Resolve<any> {

  constructor(
    private readonly taskService: TaskService,
    private httpClient: HttpClient
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {

    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': "Bearer " + localStorage.getItem('token'),
    });

    this.httpClient.get<any>('http://localhost:3000/api/tasks', { headers: headers }).subscribe({
      next: data => {
        this.taskService.setTasks(data);
      },
      error: error => {
        console.error('There was an error!', error);
      }
    });
    return of(true);
  }
}
