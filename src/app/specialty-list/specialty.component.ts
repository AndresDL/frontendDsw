import { Component, OnInit } from '@angular/core';
import { Specialty } from '../interfaces/specialty';
import { SpecialtyService } from '../specialty.service';
import { response } from 'express';


@Component({
  selector: 'app-specialty',
  templateUrl: './specialty.component.html',
  styleUrl: './specialty.component.scss'
})
export class SpecialtyComponent implements OnInit{
  specialtyArray: Specialty[] = [];
  item: any;

  constructor(
    private specialtyService: SpecialtyService,
  ) {}

  ngOnInit() {
    this.getAllSpecialties();
  }

  getAllSpecialties() {
    this.specialtyService.getSpecialties().subscribe((specialty) => {
      console.log('list of specialties:', specialty)
      this.specialtyArray = specialty;
    });
  }



  deleteSpecialty(id: number){
    this.specialtyService.deleteSpecialty(id).subscribe((response)=>{
      console.log("Specialty deleted", response);
    }, 
  (error) => console.error ("Error deleting", error));
  }
}



