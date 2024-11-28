import { Component, OnInit } from '@angular/core';
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

  doctorArray: Doctor[] = [];
  item: any;

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
      console.log(this.doctorArray);
    });
  }

  deleteDoctor(id: number){
    this.doctorService.deleteDoctor(id).subscribe({
     next: (value:void) => {
      this.toastr.success('El doctor ha sido eliminado con exito','Doctor eliminado')
      this.getDoctors();
     },
     error: (e:HttpErrorResponse) => {
      if (e.error.message) {
        this.toastr.error('Este doctor no se puede eliminar', 'Error');
      } else {
        this.toastr.error(
          'Paso algo inesperado, contacta un admin!',
          'Error'
        );
      }
     },
    }) 
  }
}
