import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public email: string = 'admin@gmail.com';
  public password: string = 'Asdf@1234';
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  login(loginForm: NgForm){
// console.log(loginForm.value);
    this.authService.login(loginForm.value.email, loginForm.value.password);
  }

}
