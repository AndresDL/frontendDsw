import { Component, OnInit } from '@angular/core';
import { Specialty } from '../interfaces/specialty';
import { SpecialtyService } from '../servicies/specialty.service';
import { Router } from '@angular/router';
import { DecodingService } from '../servicies/decoding.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-specialty',
  templateUrl: './specialty.component.html',
  styleUrl: './specialty.component.scss'
})
export class SpecialtyComponent implements OnInit{
  specialtyArray: Specialty[] = [];
  specialty: any
  item: any;
  user: any;

  constructor(
    private specialtyService: SpecialtyService,
    private decodeService: DecodingService,
    private router: Router,
    private toastr: ToastrService,
  ) {}

  ngOnInit(): void {
    this.user = this.decodeService.decodeToken()
    this.getAllSpecialties()
  }

  getAllSpecialties() {
    this.specialtyService.getSpecialties().subscribe((specialty) => {
      this.specialtyArray = specialty;
    });
  }

  getSpecialty(id:number){
    this.specialtyService.getSpecialty(id).subscribe((specialty) => {
      this.specialty = specialty;
    });
  }

  vigencySpecialty(){
    for(var i in this.specialty.doctors){
      if(this.specialty.doctors[i].vigency != false){
        this.toastr.error('Existen doctores activos con esta especialidad','Error dando de baja!')
        return;
      };
    };
    this.specialty.vigency = false;
    this.specialtyService.updateSpecialty(this.specialty).subscribe(() => {
      this.toastr.success(this.specialty.name + ' a sido dada de baja exitosamente','Exito dando de baja!')
      this.getAllSpecialties();
    });
  } 

  reactivateSpecialty(){
    this.specialty.vigency = true;
    this.specialtyService.updateSpecialty(this.specialty).subscribe(() => {
      this.toastr.success(this.specialty.name + ' a sido dada de alta exitosamente','Exito dando de alta!');
      this.getAllSpecialties();
    });
  }
}
