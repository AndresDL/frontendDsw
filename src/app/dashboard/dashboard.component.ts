import { Component, OnInit } from '@angular/core';
import { DecodingService } from '../servicies/decoding.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {

  user: any;
  

  constructor(
    private decodeService: DecodingService,
  ){}

  ngOnInit(): void {
    this.user = this.decodeService.decodeToken()
  }

}
