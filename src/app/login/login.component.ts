import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm: FormGroup = new FormGroup({
    
      username:new FormControl('',Validators.required), 
      password:new FormControl ('', Validators.required)
    });
    contructor() {}
  

  
  onSubmit(): void{
    if(this.loginForm?.valid){
      console.log('Login succesful!!!!!!! yayyyyy');
    
    } else{
      console.log('Invalid login credentials')
    }
  }
  }

