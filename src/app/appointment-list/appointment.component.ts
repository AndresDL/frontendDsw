import { Component, OnInit } from '@angular/core';
import { Appointment } from '../interfaces/appointment';
import { AppointmentService } from '../servicies/appointment.service';
import { DecodingService } from '../servicies/decoding.service';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrl: './appointment.component.scss'
})
export class AppointmentComponent implements OnInit{

  appointmentArray: Appointment[] = [];
  user: any;
  
  
  constructor(
     private appointmentService: AppointmentService,
     private decodingService: DecodingService,
  ){
  
  }

  ngOnInit(): void {
    this.user = this.decodingService.decodeToken();
    this.getUserAppointments();
  }

  getUserAppointments(){
    this.appointmentService.getfilteredAppointments(this.user.dni).subscribe(appointment => {
      this.appointmentArray = appointment;
      console.log(this.appointmentArray);
    })
  }

}
