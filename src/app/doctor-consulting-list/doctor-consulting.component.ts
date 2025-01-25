import { Component } from '@angular/core';
import { DoctorConsulting } from '../interfaces/doctor-consultings';
import { DoctorConsultingService } from '../servicies/doctor-consulting.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DecodingService } from '../servicies/decoding.service';
import { SpecialtyService } from '../servicies/specialty.service';
import { subscribe } from 'diagnostics_channel';
import { ToastrService } from 'ngx-toastr';
import { AppointmentService } from '../servicies/appointment.service';
import { Appointment } from '../interfaces/appointment';

@Component({
  selector: 'app-doctor-consulting',
  templateUrl: './doctor-consulting.component.html',
  styleUrl: './doctor-consulting.component.scss'
})
export class DoctorConsultingComponent {
  doconsArray: DoctorConsulting[] = [];
  appointmentArray: Appointment[] = [];
  doctor_consulting: any;
  item: any;
  user: any;
  name!: string

  constructor(
    private doconsService: DoctorConsultingService,
    private decodingService: DecodingService,
    private aRouter: ActivatedRoute,
    private toastr: ToastrService,
    private appointmentService: AppointmentService,
  ) {
    this.name = String(aRouter.snapshot.paramMap.get('name'))
  }

  ngOnInit(): void {
    this.user = this.decodingService.decodeToken();
    if(this.user.codUser === 0){
      this.getAllDoctor_consulting();
    }
    else {
      this.filterDoctor_consultings();
    }
  }

  getAllDoctor_consulting() {
    this.doconsService.getDoctor_consultings().subscribe((doctor_consulting) => {
      this.doconsArray = doctor_consulting;
    });
  }

  getDoctor_consulting(id: number){
    this.doconsService.getDoctor_consulting(id).subscribe((doctor_consulting) => {
      this.doctor_consulting = doctor_consulting;
      console.log(this.doctor_consulting);
    })
  }

  getAppointments(){
    this.appointmentService.getAppointments().subscribe((appointment) => {
      for(var i in appointment){
        if(appointment[i].doctor_consulting.id === this.doctor_consulting.id){
          console.log('hay turnos registrados para aca')
          return;
        };
      };
    });
  }

  vigencyDoctor_consulting(){
    this.getAppointments
    console.log('continuo')
  }

  reactivateDoctor_consulting(){

  }


  vigencyDoctor(){
  }
  

  filterDoctor_consultings(){
    this.doconsService.getfilteredDoctor_consultings(this.name).subscribe((doctor_consulting) => {
      this.doconsArray = doctor_consulting
    });
  }
}

