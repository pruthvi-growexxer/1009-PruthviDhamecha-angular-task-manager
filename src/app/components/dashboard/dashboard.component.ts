import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { TaskService } from 'src/app/services/task/task.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  constructor(public readonly authService: AuthService, public readonly taskService: TaskService, private modalService: NgbModal) { }

  ngOnInit(): void { }

  deleteTask(id: string){
    this.taskService.deleteTask(id);
    this.taskService.getAllTasks();
  }

  onUpdateStatusTask(description:any, status:any, id:any) {
    let task = {
      description: description,
      completed: !status,
    }
    this.taskService.updateTask(task,id);
    this.taskService.getAllTasks();
  }

}
