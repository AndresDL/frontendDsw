import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Doctor } from '../interfaces/doctor';
import { DoctorService } from '../servicies/doctor.service';
import { DecodingService } from '../servicies/decoding.service';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http/index.js';
import { SpecialtyService } from '../servicies/specialty.service';

@Component({
  selector: 'app-doctor-list',
  templateUrl: './doctor-list.component.html',
  styleUrl: './doctor-list.component.scss'
})
export class DoctorListComponent implements OnInit{
  @ViewChild('staticBackdrop') modal?:ElementRef
  doctorArray: any[] = [];
  specialty: any;
  doctor: any;
  item: any;
  window: any;

  constructor(
    private doctorService: DoctorService,
    private specialtyService: SpecialtyService,
    private toastr: ToastrService,
  ){}

  ngOnInit(): void {
    this.getDoctors()
  }

  getDoctors(){
    this.doctorService.getDoctors().subscribe((doctors) => {
      this.doctorArray = doctors;
    });
  }

  getDoctor(id: number){
    this.doctorService.getDoctor(id).subscribe((doctor) => {
      this.doctor = doctor;
    });
  }

  vigencyDoctor(){
    for(var i in this.doctor.consultings){
      if(this.doctor.consultings[i].vigency != false){
        this.toastr.error(this.doctor.firstName + ' ' + this.doctor.lastName 
          + ' esta registrado/a en un consultorio','Error al dar de baja!'
        );
        return;
      };
    };
    this.doctor.vigency = false;
    this.doctorService.updateDoctor(this.doctor).subscribe(() => {
      this.toastr.success(this.doctor.firstName + ' ' + this.doctor.lastName 
         + ' a sido dado/a de baja exitosamente','Exito al dar de baja!'
      );
      this.getDoctors();
    });
  }
  
  reactivateDoctor(){
    this.specialtyService.getSpecialty(this.doctor.specialty.id).subscribe((specialty) => {
      if(specialty.vigency === false){
        this.toastr.error('La especialidad del doctor/a se encuentra dada de baja, reactivela para poder reactivar al mismo/a'
          ,'Error'
        );
      } else {
        this.doctor.vigency = true;
        this.doctorService.updateDoctor(this.doctor).subscribe(() => {
          this.toastr.success(this.doctor.firstName + ' ' + this.doctor.lastName 
            + ' a sido dado/a de alta exitosamente','Exito al dar de alta!'
         );
         this.getDoctors();
        });
      };
    });
  }
}
