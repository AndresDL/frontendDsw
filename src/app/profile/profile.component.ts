import { Component, OnInit } from '@angular/core';
import { DecodingService } from '../servicies/decoding.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
  
  user: any;
  
  constructor(
     private decodingService: DecodingService,

  ){}

  ngOnInit(): void {
    this.user = this.decodingService.decodeToken();
    console.log(this.user)
  }


}
