import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

//Reactive forms
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StrongPasswordRegx } from '../interfaces/strongpass';
import { matchpass } from '../validators/matchpass.validator';
import { Doctor } from '../interfaces/doctor';
import { DoctorService } from '../doctor.service'; 
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';



@Component({
  selector: 'app-doctor-sign-in',
  templateUrl: './doctor-sign-in.component.html',
  styleUrl: './doctor-sign-in.component.scss'
})
export class SignInComponent{
  registerForm: FormGroup;
  loading: boolean = false;
  userArray: Doctor[] = [];

  constructor(
    private form: FormBuilder,
    private toastr: ToastrService,
    private registerService: DoctorService,
    private router: Router
  ){
    this.registerForm = this.form.group({
      firstName: [null,[Validators.required,Validators.maxLength(20)]],
      lastName: [null,[Validators.required,Validators.maxLength(20)]],
      email: [null,[Validators.required,Validators.email]],
      password: [null,[Validators.required]],
      repassword: [null,[Validators.required]],
      age: [null,[Validators.required]],
      tuition_number: [null,[Validators.required, Validators.maxLength(8), Validators.minLength(8)]],
    },
    {
      validators: matchpass
    })
  }

  addDoctor(){
    console.log(this.registerForm.value);
    const doctor: Doctor = {
      tuition_number: this.registerForm.value.tuition_number,
      firstName: this.registerForm.value.firstName,
      lastName: this.registerForm.value.lastName,
      email: this.registerForm.value.email,
      password: this.registerForm.value.password,
      age: this.registerForm.value.age,
      specialty: undefined
    }
    console.log(doctor)
    this.loading = true;
    this.registerService.signIn(doctor).subscribe({
      next: (v) => {
        this.loading = false;
        this.toastr.success(`Doctor ${this.registerForm.value.firstName}${this.registerForm.value.lastName}
          registered`,'The doctor has been registered');
        this.router.navigate(['/login']); 
      },
      error: (e: HttpErrorResponse) => {
        this.loading = false;
        this.toastr.error('Someone with that tuition number is already registered', 'Error');
      }
    })
  }
}
