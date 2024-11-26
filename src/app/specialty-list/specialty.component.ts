import { Component, OnInit } from '@angular/core';
import { Specialty } from '../interfaces/specialty';
import { SpecialtyService } from '../servicies/specialty.service';
import { Router } from '@angular/router';
import { DecodingService } from '../servicies/decoding.service';

@Component({
  selector: 'app-specialty',
  templateUrl: './specialty.component.html',
  styleUrl: './specialty.component.scss'
})
export class SpecialtyComponent implements OnInit{
  specialtyArray: Specialty[] = [];
  item: any;
  user: any;

  constructor(
    private specialtyService: SpecialtyService,
    private decodeService: DecodingService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.user = this.decodeService.decodeToken()
    this.getAllSpecialties()
    console.log(this.specialtyArray)
  }

  getAllSpecialties() {
    this.specialtyService.getSpecialties().subscribe((specialty) => {
      this.specialtyArray = specialty;
    });
  }

  deleteSpecialty(id: number){
    this.specialtyService.deleteSpecialty(id).subscribe((response)=>{
      this.getAllSpecialties();
    }, 
  (error) => console.error ("Error deleting", error));
  }  
}



