import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DecodingService } from '../decoding.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})

export class NavbarComponent implements OnInit {
  cod_user!: number;
  loading: boolean = false;
  
  constructor(
    private decodeService: DecodingService,
    private router: Router,
    private toastr: ToastrService,
  ){}

  ngOnInit(): void {;
    this.cod_user = this.decodeService.decodeToken();
  }
  
  logOut(){
    this.loading = true;
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
