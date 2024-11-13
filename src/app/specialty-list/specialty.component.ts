import { Component, OnInit } from '@angular/core';
import { Specialty } from '../interfaces/specialty';
import { SpecialtyService } from '../specialty.service';
import { Router } from '@angular/router';
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
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.getAllSpecialties()
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



