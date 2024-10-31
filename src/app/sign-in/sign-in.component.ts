import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

//Reactive forms
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StrongPasswordRegx } from '../interfaces/strongpass';
import { matchpass } from '../validators/matchpass.validator';
import { User } from '../interfaces/user';
import { UserService } from '../user.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss'
})
export class SignInComponent {
  registerForm: FormGroup;

  constructor(
    private form: FormBuilder,
    private toastr: ToastrService,
    private registerService: UserService,
    private router: Router
  ){
    this.registerForm = this.form.group({
      dni: [null,[Validators.required, Validators.maxLength(8), Validators.minLength(8)]],
      firstName: [null,[Validators.required,Validators.maxLength(20)]],
      lastName: [null,[Validators.required,Validators.maxLength(20)]],
      email: [null,[Validators.required,Validators.email]],
      password: [null,[Validators.required]],
      repassword: [null,[Validators.required]],
      age: [null,[Validators.required]],
    },
    {
      validators: matchpass
    })
  }

  addUser(){
    console.log(this.registerForm.value);
    const user: User = {
      dni: this.registerForm.value.dni,
      firstName: this.registerForm.value.firstName,
      lastName: this.registerForm.value.lastName,
      email: this.registerForm.value.email,
      password: this.registerForm.value.password,
      age: this.registerForm.value.age,
      cod_user: 1,
    }
    console.log(user)
    this.registerService.signIn(user).subscribe(data => {
      console.log('User registered');
      this.toastr.success(`User ${this.registerForm.value.firstName}${this.registerForm.value.lastName}
         registered`,'The user has been registered');
      this.router.navigate(['/login']);
      
    })
  }
  

}
