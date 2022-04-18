import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import { TaskService } from 'src/app/services/task/task.service';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.scss']
})
export class HelpComponent implements OnInit {

  constructor(public readonly authService: AuthService, public readonly taskService: TaskService) { }

  helpForm = new FormGroup({
    comment: new FormControl('', [Validators.required, Validators.minLength(5)])
  });
  ngOnInit(): void {
  }

  onCreateTask() {
    console.log(this.helpForm.value);
  }
}
