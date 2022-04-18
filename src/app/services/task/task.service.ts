import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  tasks:any;
  task:any;

  constructor(private router: Router, private http: HttpClient, private authService: AuthService) { }

  deleteTask(id: string) {
    const header = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.authService.token
    })

    this.http.delete<any>('http://localhost:3000/api/tasks/' + id, { headers: header })
    .subscribe({
      next: data => {
        this.tasks = this.tasks.filter((item:any) => item._id !== id);
        },
        error: error => {
          console.error('There was an error!', error);
          console.log('Invalid Records');
        }
      });
  }

  updateTask(task: any, id: string) {

    const params = {
      description: task.description,
      completed: task.completed,
    }

    const header = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.authService.token
    })

    this.http.patch<any>('http://localhost:3000/api/tasks/' + id, params, { headers: header })
      .subscribe({
        next: data => {
          this.router.navigate(['/dashboard']);
        },
        error: error => {
          console.error('There was an error!', error);
          console.log('Invalid Records');
        }
      });
  }

  createTask(task: any) {

    const params = {
      description: task.description,
      completed: task.status,
    }

    const header = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.authService.token
    })

    this.http.post<any>('http://localhost:3000/api/tasks', params, { headers: header })
      .subscribe({
        next: data => {
          this.router.navigate(['/dashboard']);
        },
        error: error => {
          console.error('There was an error!', error);
          console.log('Invalid Records');
        }
      });
  }

  getTask(id: string) {

    const header = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.authService.token
    })

    this.http.get<any>('http://localhost:3000/api/tasks/' + id, { headers: header })
      .subscribe({
        next: data => {
          this.task = data;
        },
        error: error => {
          console.error('There was an error!', error);
          console.log('Invalid Records');
        }
      });
  }

  getAllTasks() {
    const header = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.authService.token
    })

    this.http.get<any>('http://localhost:3000/api/tasks', { headers: header })
      .subscribe({
        next: data => {
          this.setTasks(data)
        },
        error: error => {
          console.error('There was an error!', error);
          console.log('Invalid Records');
        }
      });
  }

  setTasks(tasks:any){
    this.tasks = tasks;
  }

}
