import { Component, OnInit } from '@angular/core';
import { DecodingService } from '../decoding.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {

  codUser: number = 0;
  

  constructor(
    private decodeService: DecodingService,
  ){}

  ngOnInit(): void {
    this.codUser = this.decodeService.decodeToken()
  }

}
