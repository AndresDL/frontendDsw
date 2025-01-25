import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Doctor } from '../interfaces/doctor';
import { DoctorService } from '../servicies/doctor.service';
import { DecodingService } from '../servicies/decoding.service';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http/index.js';

@Component({
  selector: 'app-doctor-list',
  templateUrl: './doctor-list.component.html',
  styleUrl: './doctor-list.component.scss'
})
export class DoctorListComponent implements OnInit{
  @ViewChild('staticBackdrop') modal?:ElementRef
  doctorArray: Doctor[] = [];
  doctor: any;
  item: any;
  window: any;

  constructor(
    private doctorService: DoctorService,
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
      console.log(this.doctor);
    });
  }

  vigencyDoctor(){
    if(this.doctor.consultings[0] != undefined){
      this.toastr.error(this.doctor.firstName + '' + this.doctor.lastName 
        + ' esta registrado en un consultorio','Error al dar de baja!'
      );
      return;
    };
    this.doctor.vigency = false;
    this.doctorService.updateDoctor(this.doctor).subscribe(() => {
      this.toastr.success(this.doctor.firstName + ' ' + this.doctor.lastName 
         + ' a sido dado de baja exitosamente','Exito al dar de baja!'
      );
      this.getDoctors();
    });
  }
  
  reactivateDoctor(){
    console.log('hola');
    this.doctor.vigency = true;
    this.doctorService.updateDoctor(this.doctor).subscribe(() => {
      this.toastr.success(this.doctor.firstName + ' ' + this.doctor.lastName 
        + ' a sido dado de alta exitosamente','Exito al dar de alta!'
     );
     this.getDoctors();
    });
  }
}
