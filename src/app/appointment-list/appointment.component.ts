import { Component, OnInit } from '@angular/core';
import { Appointment } from '../interfaces/appointment';
import { AppointmentService } from '../servicies/appointment.service';
import { DecodingService } from '../servicies/decoding.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrl: './appointment.component.scss'
})
export class AppointmentComponent implements OnInit{

  appointmentArray: Appointment[] = [];
  user: any;
  item: any;
  id!: number; 
  selectedAppointment: Appointment | null = null; 
  
  constructor(
     private appointmentService: AppointmentService,
     private decodingService: DecodingService,
     private toastr: ToastrService,
  ){}

  ngOnInit(): void {
    this.user = this.decodingService.decodeToken();
    this.getUserAppointments();
  }

  openDetailModal(item: Appointment) {
    this.selectedAppointment = item
  }

  getUserAppointments(){
    this.appointmentService.getfilteredAppointments(this.user.dni).subscribe(appointment => {
      this.appointmentArray = appointment;
    })
  }

  deleteAppointment(id: number){
    this.appointmentService.deleteAppointment(id).subscribe((response)=>{
      this.getUserAppointments();
      this.toastr.success('Su turno ha sido elminado exitosamente','Turno eliminado');
    },
  (error)=> console.error ("Error deleting", error));
  }

  assingId(id: number){
    this.id = id;
  }

}
