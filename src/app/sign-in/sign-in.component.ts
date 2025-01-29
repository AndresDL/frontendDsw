import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

//Reactive forms
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StrongPasswordRegx } from '../interfaces/strongpass'; //Contra segura 
import { matchpass } from '../validators/matchpass.validator';
import { User } from '../interfaces/user';
import { UserService } from '../servicies/user.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';



@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss'
})
export class SignInComponent{
  registerForm: FormGroup;
  loading: boolean = false;
  userArray: User[] = [];
  verif: boolean = false; 
  captcha: string = '';

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

  gotoUserSignin(){
    this.verif = true;
  }

  captchaResuelto(resCaptcha: any){
    this.captcha = resCaptcha;
  }

  addUser(){
    const user: User = {
      dni: this.registerForm.value.dni,
      firstName: this.registerForm.value.firstName,
      lastName: this.registerForm.value.lastName,
      email: this.registerForm.value.email,
      password: this.registerForm.value.password,
      age: Number.parseInt(this.registerForm.value.age),
      codUser: 1,
    }
    this.loading = true;
    this.registerService.signIn(user, this.captcha).subscribe({
      next: (v) => {
        this.loading = false;
        this.toastr.success(`Usuario ${this.registerForm.value.firstName} ${this.registerForm.value.lastName}
          registrado`,'El usuario ha sido registrado');
        this.router.navigate(['/login']); 
      },
      error: (e: HttpErrorResponse) => {
        this.loading = false;
        if(e.error.message && this.captcha === ''){
          this.toastr.error(e.error.message,'Error');   
        } else if(e.error.message){
          this.toastr.error('Ya hay alguien registrado con ese DNI','Error');
        } else {
          this.toastr.error('Paso algo inesperado, contacte a un admin','Error');
        };
      },
    });
  }

  showLoading(){
    this.loading = true;
  }
}
