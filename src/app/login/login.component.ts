import { Component} from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { User } from '../interfaces/user';
import { UserService } from '../user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  dni: string = '';
  password: string = '';
  loading : boolean = false;

  constructor(
    private toastr: ToastrService,
    private loginService: UserService,
    private router: Router
  ){}

  login(){
    //Validate data entry
    if(this.dni == '' || this.password == ''){
      this.toastr.error('Ambos campos deben ser completados','Error');
      return 
    }
    //Create user
    const user: User = {
      dni: this.dni,
      password: this.password,
    }
    this.loading = true;
    this.loginService.login(user).subscribe({
      next: ({token}) => {
        localStorage.setItem('token', token);
        this.router.navigate(['/home']);
      },
      error: (e: HttpErrorResponse) => {
        this.loading = false;
        if (e.error.message){
          this.toastr.error(e.error.message,'Error');
        } else {
          this.toastr.error('Paso algo inesperado, contacta un admin!','Error');
        }
      }
    })
  }  
}

