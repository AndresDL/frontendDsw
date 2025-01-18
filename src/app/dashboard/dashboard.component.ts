import { Component, OnInit } from '@angular/core';
import { DecodingService } from '../servicies/decoding.service';
import { Appointment } from '../interfaces/appointment';
import { AppointmentService } from '../servicies/appointment.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {

  earliestTime!: string;
  earliestDate!: string
  user: any;
  appointmentArray: Appointment[] = [];


  constructor(
    private appointmentService: AppointmentService,
    private decodeService: DecodingService,
  ){}

  ngOnInit(): void {
    this.user = this.decodeService.decodeToken();
    this.getUserAppointments();
    this.nextAppointment();
  }

  getUserAppointments(){
    this.appointmentService.getfilteredAppointments(this.user.dni).subscribe(appointment => {
      this.appointmentArray = appointment;
      this.nextAppointment();
    })
  }

  nextAppointment() {
    if(this.appointmentArray[0]){ //Validar que no este vacio 
    this.earliestDate = this.appointmentArray[0].appoDate
    this.earliestTime = this.appointmentArray[0].appoTime
    for (var element of this.appointmentArray) {
      if ( this.earliestDate > element.appoDate) {
       this.earliestDate = element.appoDate
       this.earliestTime = element.appoTime
      } 
    }
    this.getFormattedTime()
    }
  }

  getFormattedTime(){
    let modifier = '';
    let [hours, minutes] = this.earliestTime.split(':');
    if (hours >= '12') {
      modifier = 'PM'
    } else if ( hours < '12') {
      modifier = 'AM' 
    }
    this.earliestTime = `${hours}:${minutes} ${modifier}`
  }
}
