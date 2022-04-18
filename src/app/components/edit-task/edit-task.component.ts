import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { TaskService } from 'src/app/services/task/task.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.scss']
})
export class EditTaskComponent implements OnInit {
  taskStatus = [{ key: 'Pending', value: false }, { key: 'Completed', value: true }];
  idFromRoute: any;
  task: any;
  constructor(public readonly authService: AuthService, public readonly taskService: TaskService, private route: ActivatedRoute) { }

  updateTaskForm = new FormGroup({
    description: new FormControl('', [Validators.required, Validators.minLength(5)]),
  });
  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    this.idFromRoute = routeParams.get('id');
    this.taskService.getTask(this.idFromRoute);
  }

  onUpdateTask() {
    let task = {
      description: this.updateTaskForm.value.description,
      completed: this.taskService.task.completed,
    }
    this.taskService.updateTask(task,this.idFromRoute);
    this.taskService.getAllTasks();
  }
}
