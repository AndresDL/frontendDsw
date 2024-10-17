import { Component, OnInit } from '@angular/core';
import { Specialty } from './specialty';
import { SpecialtyService } from '../specialty.service';
import { FormBuilder, FormGroup, NumberValueAccessor, Validators } from '@angular/forms';
import { response } from 'express';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-specialty',
  templateUrl: './specialty.component.html',
  styleUrl: './specialty.component.scss'
})
export class SpecialtyComponent implements OnInit{
  specialtyArray: Specialty[] = [];
  specialtyForm: FormGroup
  item: any;
  id: number;

  constructor(
    private specialtyService: SpecialtyService,
    private aRouter: ActivatedRoute,
    private form: FormBuilder
  ) {
    this.specialtyForm = this.form.group({
      name: ['', [Validators.required, Validators.maxLength(22)]],
      price: [null, Validators.required],
    })
    this.id = Number(aRouter.snapshot.paramMap.get('id'));
    console.log(this.id);
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

  
  addSpecialty(){
    const specialty: Specialty = {
      name: this.specialtyForm.value.name,
      price: this.specialtyForm.value.price,
    }

    //if(this.id !== 0){
    //  specialty.id = this.id
    //}


    this.specialtyService.addSpecialty(specialty).subscribe(() => {
      console.log('Producto Agregado');
    })
  }

  deleteSpecialty(id: number){
    this.specialtyService.deleteSpecialty(id).subscribe((response)=>{
      console.log("Specialty deleted", response);
    }, 
  (error) => console.error ("Error deleting", error));
  }

  getSpecialty(id: number){
    this.specialtyService.getSpecialty(id).subscribe((specialty: Specialty) => {
    console.log(specialty,specialty.name);
    this.specialtyForm.setValue({
      name: specialty.name,
      price: specialty.price,
    })
    })
  }
}



