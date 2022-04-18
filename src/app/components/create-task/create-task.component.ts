import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import { TaskService } from 'src/app/services/task/task.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss']
})
export class CreateTaskComponent implements OnInit {

  taskStatus = [{ key: 'Pending', value: 'false' }, { key: 'Completed', value: 'true' }];
  constructor(public readonly authService: AuthService, public readonly taskService: TaskService) { }

  createTaskForm = new FormGroup({
    description: new FormControl('', [Validators.required, Validators.minLength(5)]),
    status: new FormControl('', [Validators.required]),
  });
  ngOnInit(): void {
  }

  onCreateTask() {
    this.taskService.createTask(this.createTaskForm.value);
  }
}
