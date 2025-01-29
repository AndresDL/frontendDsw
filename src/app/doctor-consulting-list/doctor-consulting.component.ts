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
  appoVerif?: boolean;
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

  async ngOnInit(): Promise<void> {
    this.user = this.decodingService.decodeToken();
    if(this.user.codUser === 0){
      console.log('admin')
      this.getAllDoctor_consulting();
    }
    else {
      console.log('user')
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
    })
  }

  getAppointments(){
    this.appoVerif = false;
    this.appointmentService.getAppointments().subscribe((appointment) => {
      for(var i in appointment){
        if(appointment[i].doctor_consulting.id === this.doctor_consulting.id){
          console.log('hay turnos registrados para aca')
        };
      };
    });
  }

  vigencyDoctor_consulting(){
    this.getAppointments()
    if(this.appoVerif === true){
      this.toastr.error('Todavia hay turnos programados con este doctor en este consultorio',
        'Error al dar de baja'
      );
      return;
    }
    this.doctor_consulting.vigency = false;
    console.log(this.doctor_consulting)
    this.doconsService.updateDoctor_consulting(this.doctor_consulting).subscribe(() => {
      this.toastr.success('La instancia laboral a sido dada de baja','Exito al dar de baja');
    });
    this.getAllDoctor_consulting();
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

