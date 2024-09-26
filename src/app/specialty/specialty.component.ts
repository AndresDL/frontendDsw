import { Component, OnInit } from '@angular/core';
import { Specialty } from './specialty';
import { SpecialtyService } from '../specialty.service';

@Component({
  selector: 'app-specialty',
  templateUrl: './specialty.component.html',
  styleUrl: './specialty.component.scss'
})
export class SpecialtyComponent implements OnInit{
  specialtyArray: Specialty[] = [];
  selectedSpecialty: Specialty = new Specialty();
  list: string[] = ["Hola","Me","Llamo","Andres"];
  
  constructor(private specialtyService: SpecialtyService) {}


  ngOnInit() {
    this.specialtyService.getSpecialties();
  }

  getSpecialties() {
    this.specialtyService.getSpecialties().subscribe((specialties) => {
      this.specialtyArray = specialties;
    });
  }

  addOrEdit(){
    if (this.selectedSpecialty.id === 0) {
      this.specialtyService.addSpecialty(this.selectedSpecialty).subscribe(() => {
        this.getSpecialties();
        this.selectedSpecialty = new Specialty();
      });
    }
    else{
      this.specialtyService.updateSpecialty(this.selectedSpecialty).subscribe(() => {
        this.getSpecialties();
        this.selectedSpecialty = new Specialty();
      }); 
    }
  }

  openForEdit(specialty: Specialty) {
    this.selectedSpecialty = specialty;
  }

  delete() {
    if(confirm('Are you sure you want to delete it?')) {
      this.specialtyService.deleteSpecialty(this.selectedSpecialty.id).subscribe(() => {
        this.getSpecialties();
        this.selectedSpecialty = new Specialty();
      })
    }
  }
}
