import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

//Reactive forms
import { FormBuilder, FormGroup, Validators, ɵNgSelectMultipleOption } from '@angular/forms';
import { matchpass } from '../validators/matchpass.validator';
import { Doctor } from '../interfaces/doctor';
import { DoctorService } from '../servicies/doctor.service'; 
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { SpecialtyService } from '../servicies/specialty.service';
import { Specialty } from '../interfaces/specialty';




@Component({
  selector: 'app-doctor-sign-in',
  templateUrl: './doctor-sign-in.component.html',
  styleUrl: './doctor-sign-in.component.scss'
})
export class DoctorSignInComponent implements OnInit{
  id!: number;
  registerForm: FormGroup;
  loading: boolean = false;
  userArray: Doctor[] = [];
  specialtyArray: Specialty[] = []
  item: any;
  doctor!: Doctor;
  

  constructor(
    private form: FormBuilder,
    private toastr: ToastrService,
    private registerService: DoctorService,
    private specialtyService: SpecialtyService,
    private router: Router,
  ){
    this.registerForm = this.form.group({
      firstName: [null,[Validators.required,Validators.maxLength(20)]],
      lastName: [null,[Validators.required,Validators.maxLength(20)]],
      email: [null,[Validators.required,Validators.email]],
      password: [null,[Validators.required]],
      repassword: [null,[Validators.required]],
      age: [null,[Validators.required]],
      tuition_number: [null,[Validators.required, Validators.maxLength(5), Validators.minLength(5)]],
      specialty: [null,[Validators.required]],
    },
    {
      validators: matchpass
    })
  }

  ngOnInit(): void {
    this.getSpecialties()
  }

  getSpecialties(){
    this.specialtyService.getSpecialties().subscribe((specialty) => {
      this.specialtyArray = specialty;
    });
  }

  addDoctor(){
  const doctor: Doctor = {
    tuition_number: Number.parseInt(this.registerForm.value.tuition_number),
    firstName: this.registerForm.value.firstName,
    lastName: this.registerForm.value.lastName,
    email: this.registerForm.value.email,
    password: this.registerForm.value.password,
    age: Number.parseInt(this.registerForm.value.age),
    specialty: this.registerForm.value.specialty,
    vigency: true,
    codUser: 2
  }
  this.loading = true;
  this.registerService.signIn(doctor).subscribe({
    next: (v) => {
      this.loading = false;
      this.toastr.success(`El doctor ${this.registerForm.value.firstName} ${this.registerForm.value.lastName}
        ha sido registrado`,'Doctor registrado');
      this.router.navigate(['/login']); 
    },
    error: (e: HttpErrorResponse) => {
      this.loading = false;
      this.toastr.error('Alguien ya se ha registrado con esa matricula', 'Error');
    }
  })
  }

  showLoading(){
    this.loading = true;
  }
}
