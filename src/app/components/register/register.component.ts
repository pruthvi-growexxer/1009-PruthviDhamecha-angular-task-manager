import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ConfirmPasswordValidator } from 'src/app/validators/confirm-password/ConfirmPasswordValidator';
import { PasswordValidator } from 'src/app/validators/password/PasswordValidator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private authService: AuthService) { }

  registerForm = new FormGroup({
    name: new FormControl('admin', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('admin@gmail.com', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]),
    password: new FormControl('Asdf@1234', [Validators.required, PasswordValidator(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/i)]),
    confirmpassword: new FormControl('Asdf@1234', [Validators.required, PasswordValidator(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/i)]),
    age: new FormControl('25', [Validators.required, Validators.pattern("^(?:1[8-9]|[2-5][0-9]|60)$")]),
  },{validators: ConfirmPasswordValidator()});


  ngOnInit(): void {
  }

  onRegister(){
    this.authService.register(this.registerForm.value);
  }

  cpw(){
    console.log(this.registerForm);
  }
}
