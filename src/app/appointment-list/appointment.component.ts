import { Component, OnInit } from '@angular/core';
import { Appointment } from '../interfaces/appointment';
import { AppointmentService } from '../servicies/appointment.service';
import { DecodingService } from '../servicies/decoding.service';
import { ToastrService } from 'ngx-toastr';
import { ConnectableObservable } from 'rxjs';
import { computeStyles } from '@popperjs/core';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrl: './appointment.component.scss'
})
export class AppointmentComponent implements OnInit{

  appointmentArray: any[] = [];
  user: any;
  item: any;
  verif: any;
  id!: number; 
  loading: boolean = false;
  selectedAppointment: Appointment | null = null; 
  
  constructor(
     private appointmentService: AppointmentService,
     private decodingService: DecodingService,
     private toastr: ToastrService,
  ){}

  ngOnInit(){
    this.user = this.decodingService.decodeToken();
    if(this.user.codUser === 1){
      this.getUserAppointments();
    } else {
      this.getDoctorAppointments();
    }
    
  }

  openDetailModal(item: Appointment) {
    this.selectedAppointment = item;
  }

  getUserAppointments(){
    this.appointmentService.getfilteredAppointments(this.user.dni).subscribe((appointments) => {
      this.appointmentArray = this.formatDateTime(appointments);
    });
  }

  getDoctorAppointments(){
   this.appointmentService.getDocfilteredAppointments(this.user.tuition_number).subscribe((appointments) => {
    this.appointmentArray = this.formatDateTime(appointments);
   });
  }

  formatDateTime(appointments: any){
    for( var i in appointments){
      let aux = "";
      aux = appointments[i].appoDate.replace("T00:00:00.000Z","");
      let [year,month,day] = aux.split('-');
      appointments[i].appoDate = `${day}/${month}/${year}`
      appointments[i].appoTime = appointments[i].appoTime.replace(':00:00',':00')
    };
    return appointments;
  }

  deleteAppointment(id: number){
    this.appointmentService.deleteAppointment(id).subscribe((response)=>{
      if(this.user.codUser === 1){
        this.getUserAppointments();
        this.toastr.success('Su turno ha sido cancelado exitosamente','Turno cancelado');
      } else {
        this.getDoctorAppointments();
        this.toastr.success('El turno ha sido cancelado exitosamente','Turno cancelado');
      }
      
    },
  (error)=> console.error ("Error deleting", error));
  }

  assingId(id: number){
    this.id = id;
  }
}
