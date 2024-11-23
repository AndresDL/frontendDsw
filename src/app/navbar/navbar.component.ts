import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DecodingService } from '../decoding.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})

export class NavbarComponent {
  loading: boolean = false;
  
  constructor(
    private router: Router,
  ){}

  logOut(){
    this.loading = true;
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
