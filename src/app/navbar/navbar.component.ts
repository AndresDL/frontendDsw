import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DecodingService } from '../servicies/decoding.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})

export class NavbarComponent implements OnInit{
  loading: boolean = false;
  user: any;

  constructor(
    private router: Router,
    private decodingService: DecodingService,
  ){}

  ngOnInit(): void {
    this.user = this.decodingService.decodeToken();
  }

  logOut(){
    this.loading = true;
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
