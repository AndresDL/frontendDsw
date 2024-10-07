import { Component, OnInit } from '@angular/core';
import { Specialty } from './specialty';
import { SpecialtyService } from '../specialty.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { response } from 'express';

@Component({
  selector: 'app-specialty',
  templateUrl: './specialty.component.html',
  styleUrl: './specialty.component.scss'
})
export class SpecialtyComponent implements OnInit{
  specialtyArray: Specialty[] = [];
  specialtyForm: FormGroup
  item: any;

  constructor(
    private specialtyService: SpecialtyService,
    private form: FormBuilder
  ) {
    this.specialtyForm = this.form.group({
      name: ['', [Validators.required, Validators.maxLength(22)]],
      price: [null, Validators.required],
    })
  }

  ngOnInit() {
    this.getAllSpecialties();
  }

  getAllSpecialties() {
    this.specialtyService.getSpecialties().subscribe((specialty) => {
      console.log('list of specialties:', specialty)
      this.specialtyArray = specialty;
    });
  }

  newSpecialty(){
    const specialty: Specialty = {
      id: 0,
      name: this.specialtyForm.value.name,
      price: this.specialtyForm.value.price,
    }
    this.specialtyService.addSpecialty(specialty).subscribe(() => {
      console.log('Producto Agregado');
    })
  }

  oneSpecialty(id: number){
    this.specialtyService.getSpecialty(id).subscribe((specialty) => {
      console.log(specialty)
    })
  }

  deleteSpecialty(id: number){
    this.specialtyService.deleteSpecialty(id).subscribe((response)=>{
      console.log("Specialty deleted", response);
      this.getAllSpecialties();
    }, 
  (error) => console.error ("Error deleting", error));
  }
}



