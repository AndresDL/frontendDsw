import { Component, OnInit } from '@angular/core';
import { DecodingService } from '../servicies/decoding.service';
import { Appointment } from '../interfaces/appointment';
import { AppointmentService } from '../servicies/appointment.service';
import { DoctorService } from '../servicies/doctor.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {

  earliestTime: any;
  earliestDate: any;
  user: any;
  appointmentArray: any[] = [];


  constructor(
    private appointmentService: AppointmentService,
    private decodeService: DecodingService,
  ){}

  ngOnInit(): void {
    this.user = this.decodeService.decodeToken();
    if(this.user.codUser === 1){
      this.getUserAppointments();
    } else if (this.user.codUser === 2) {
      this.getDoctorAppointments();
    }
  }

  getUserAppointments(){
    this.appointmentService.getfilteredAppointments(this.user.dni).subscribe(appointment => {
      this.appointmentArray = appointment;
      this.nextAppointment();
    })
  }

  getDoctorAppointments(){
    this.appointmentService.getDocfilteredAppointments(this.user.tuition_number).subscribe((appointments) => {
      this.appointmentArray = appointments;
      this.nextAppointment();
    })
  }

  nextAppointment(){
    if(this.appointmentArray.length > 1){ //Validar que no este vacio y no sea un unico turno  
      for(var i in this.appointmentArray){
        if(this.appointmentArray[i].assisted === 'Vigente'){
          this.earliestDate = this.appointmentArray[i].appoDate;
          this.earliestTime = this.appointmentArray[i].appoTime;
          break;
        };
      };
      if(this.earliestDate != undefined && this.earliestTime != undefined){
        for(var element of this.appointmentArray){
          if(element.assisted === 'Vigente'){
            if(this.earliestDate > element.appoDate || this.earliestDate === element.appoDate  // >= no estaba funcionando bien
              && this.earliestTime > element.appoTime){
              this.earliestDate = element.appoDate;
              this.earliestTime = element.appoTime;
            }; 
          };
        };
      };
    } else if (this.appointmentArray[0]){
      console.log(this.appointmentArray[0].assisted)
      if(this.appointmentArray[0].assisted === 'Vigente'){
        this.earliestDate = this.appointmentArray[0].appoDate;
        this.earliestTime = this.appointmentArray[0].appoTime;
      };
    };
    if(this.earliestDate && this.earliestTime){
      this.getFormattedTime();
    };
  }

  getFormattedTime(){
    let modifier = '';
    let [hours, minutes] = this.earliestTime.split(':');
    if (hours >= '12') {
      modifier = 'PM';
    } else if ( hours < '12') {
      modifier = 'AM';
    };
    this.earliestTime = `${hours}:${minutes} ${modifier}`;
  };
}
