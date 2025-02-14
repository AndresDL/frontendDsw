import { Component, numberAttribute, OnInit } from '@angular/core';
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

  appointmentArray: any[] = [];
  appointmentCancel: any;
  user: any;
  item: any;
  verif: any;
  opflag: any;
  id!: number; 
  loading: boolean = false;
  selectedAppointment: any; 
  
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

  getAppointment(id: number){
    this.appointmentService.getAppointment(id).subscribe((appointment) => {
      this.appointmentCancel = appointment;
    });
  }

  getUserAppointments(){
    this.appointmentService.getfilteredAppointments(this.user.dni).subscribe((appointments) => {
      this.appointmentArray = this.formatDateTime(appointments);
      this.appointmentArray = this.orderAppointmentArray(this.appointmentArray);
    });
  }

  getDoctorAppointments(){
   this.appointmentService.getDocfilteredAppointments(this.user.tuition_number).subscribe((appointments) => {
    this.appointmentArray = this.formatDateTime(appointments);
    this.appointmentArray = this.orderAppointmentArray(this.appointmentArray);
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

  orderAppointmentArray(appoArray: any[]){
    for(var i in appoArray){
      let [day,month,year] = appoArray[i].appoDate.split('/')
      appoArray[i].appoDate = `${month}/${day}/${year}`
    }
    appoArray.sort((a,b) =>{
      if(a.appoDate === b.appoDate){
        if(a.appoTime > b.appoTime){
          return Number.parseInt(a.appoTime) - Number.parseInt(b.appoTime)
        };
      } else {
        return +new Date(a.appoDate) - +new Date(b.appoDate);
      };
      return 0;
    });
    for(var i in appoArray){
      let [month,day,year] = appoArray[i].appoDate.split('/')
      appoArray[i].appoDate = `${day}/${month}/${year}`
    }
    return appoArray;
  }

  cancelAppointment(flag: string){
    if(flag === 'cancelar'){
      if(this.user.codUser === 1){
        this.appointmentCancel.assisted = 'Cancelado por paciente';
      } else if (this.user.codUser === 2){
        this.appointmentCancel.assisted = 'Cancelado por doctor';
      };
    } else if (flag === 'completar'){
      this.appointmentCancel.assisted = 'Completado'
    }
    this.appointmentService.updateAppointment(this.appointmentCancel).subscribe(() => {
      if(flag = 'cancelar'){
        this.toastr.success('El turno a sido cancelado exitosamente','Exito al cancelar');
      } else if(flag = 'completar') {
        this.toastr.success('El turno a sido completado exitosamente','Exito al completar');
      };
      if(this.user.codUser === 1){
        this.getUserAppointments();
      } else if (this.user.codUser === 2){
        this.getDoctorAppointments();
      };
    });
  }

  assingId(id: number){
    this.id = id;
  }
}
