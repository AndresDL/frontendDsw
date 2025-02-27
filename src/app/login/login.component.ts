import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { User } from '../interfaces/user';
import { UserService } from '../servicies/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Doctor } from '../interfaces/doctor';
import { DoctorService } from '../servicies/doctor.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  dni: string = '';
  password: string = '';
  loading: boolean = false;
  captcha: string = '';

  constructor(
    private toastr: ToastrService,
    private userService: UserService,
    private doctorService: DoctorService,
    private router: Router,
  ) {}

  ngOnInit(): void {
  }

  captchaResuelto(resCaptcha: any){
    this.captcha = resCaptcha;
  }

  login() {
    //Validate data entry
    if (this.dni == '' || this.password == '') {
      this.toastr.error('Ambos campos deben ser completados', 'Error');
      return;
    }
    //Create user
    if(this.dni.trim().length == 6 || this.dni.trim().length == 8){
      const user: User = {
        dni: this.dni.trim(),
        password: this.password,
      };
      this.loading = true;
      this.userService.login(user, this.captcha).subscribe({
        next: ({ token }) => {
          console.log(token)
          sessionStorage.setItem('token', token);
          this.router.navigate(['/home']);
        },
        error: (e: HttpErrorResponse) => {
          if (e.error.message) {
            this.toastr.error(e.error.message, 'Error');
          } else {
            this.toastr.error(
              'Paso algo inesperado, contacta un admin!',
              'Error'
            );
          }
          this.loading = false;
        },
      });
    }else if(this.dni.trim().length == 5){
      //Login Doctor
      const doctor: Doctor ={
        tuition_number: Number.parseInt(this.dni.trim()),
        password: this.password,
      };
      this.loading = true;
      this.doctorService.logInDoc(doctor, this.captcha).subscribe({
        next: ({token}) => {
          sessionStorage.setItem('token', token);
          this.router.navigate(['/home']);
        },
        error: (e:HttpErrorResponse) =>{
          if(e.error.message) {
            this.toastr.error(e.error.message, 'Error');
          } else {
            this.toastr.error(
              'Paso algo inesperado, contacta un admin!',
              'Error'
            );
          }
          this.loading = false;
        },
      });
    } else {
      this.toastr.error('El usuario ingresado no es valido, ingrese su DNI o matricula','Error')
    }
  }

  showLoading(){
    this.loading = true;
  }
}
