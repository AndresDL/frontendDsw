import { Component, OnInit } from '@angular/core';
import { Doctor } from '../interfaces/doctor';
import { DoctorService } from '../doctor.service';
import { DecodingService } from '../decoding.service';

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
    this.doctorService.deleteDoctor(id).subscribe((response)=>{
      console.log("Doctor deleted", response);
      this.getDoctors();
    },
  (error)=> console.error ("Error deleting", error));
  }
}
