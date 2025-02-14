import { Component } from '@angular/core';
import { DoctorConsulting } from '../interfaces/doctor-consultings';
import { DoctorConsultingService } from '../servicies/doctor-consulting.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { DecodingService } from '../servicies/decoding.service';
import { SpecialtyService } from '../servicies/specialty.service';
import { subscribe } from 'diagnostics_channel';
import { ToastrService } from 'ngx-toastr';
import { AppointmentService } from '../servicies/appointment.service';
import { Appointment } from '../interfaces/appointment';
import { app } from '../../../server';
import { DoctorService } from '../servicies/doctor.service';
import { ConsultingService } from '../servicies/consulting.service';

@Component({
  selector: 'app-doctor-consulting',
  templateUrl: './doctor-consulting.component.html',
  styleUrl: './doctor-consulting.component.scss'
})
export class DoctorConsultingComponent {
  doconsArray: any[] = [];
  appo: any;
  doctor_consulting: any;
  item: any;
  user: any;
  name!: string

  constructor(
    private doconsService: DoctorConsultingService,
    private decodingService: DecodingService,
    private doctorService: DoctorService,
    private consultingService: ConsultingService,
    private aRouter: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router,
    private appointmentService: AppointmentService,
  ) {
    this.name = String(aRouter.snapshot.paramMap.get('name'))
  }

  ngOnInit(){
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
      this.appo = undefined;
      this.getAppointments();
    });
  }

  getAppointments(){
    this.appointmentService.getAppointments().subscribe((appointment) => {
      for(var i in appointment){
        if(appointment[i].doctor_consulting.id === this.doctor_consulting.id
          && appointment[i].assisted === 'Vigente'
        ){
          this.appo = appointment;
          return;
        };
      };
    });
  }

  vigencyDoctor_consulting(){
    if(this.appo != undefined){
      this.toastr.error('Todavia hay turnos programados con este/a doctor/a en este consultorio',
        'Error al dar de baja'
      );
      return;
    }
    this.doctor_consulting.doctor = this.doctor_consulting.doctor.id
    this.doctor_consulting.consulting = this.doctor_consulting.consulting.id
    this.doctor_consulting.vigency = false;
    this.doconsService.updateDoctor_consulting(this.doctor_consulting).subscribe(() => {
      this.toastr.success('La instancia laboral a sido dada de baja','Exito al dar de baja');
      this.getAllDoctor_consulting();
    });
  }

  reactivateDoctor_consulting(){
    this.doctorService.getDoctor(this.doctor_consulting.doctor.id).subscribe((doctor) => {
      if(doctor.vigency === false){
        this.toastr.error('El/la doctor/a perteneciente a esta instancia se encuntra dado/a de baja, reactivelo/a para continuar',
          'Error al dar de baja');
        return;
      } else {
        this.consultingService.getConsulting(this.doctor_consulting.consulting.id).subscribe((consulting) => {
          if(consulting.vigency === false){
            this.toastr.error('El consultorio perteneciente a esta instancia se encuentra dado de baja, reactivelo para continuar','Error al dar de alta')
            return;
          } else {
            for(var i in this.doconsArray){
              if(this.doctor_consulting.doctor.id === this.doconsArray[i].doctor.id
                && this.doconsArray[i].vigency === true
              ){
                this.toastr.error('El/la doctor/a ya se encuntra trabajando en otro consultorio actualmente','Error al dar de alta');
                return;
              };
            };
            this.doctor_consulting.doctor = this.doctor_consulting.doctor.id;
            this.doctor_consulting.consulting = this.doctor_consulting.consulting.id;
            this.doctor_consulting.vigency = true;
            this.doconsService.updateDoctor_consulting(this.doctor_consulting).subscribe(() => {
              this.toastr.success('La instancia laboral a sido dada de alta','Exito al dar de alta');
              this.getAllDoctor_consulting();
            });
          };
        });
      };
    });
  }

  filterDoctor_consultings(){
    this.doconsService.getfilteredDoctor_consultings(this.name).subscribe((doctor_consulting) => {
      for(var i in doctor_consulting){
        if(doctor_consulting[i].vigency === true){
         this.doconsArray.push(doctor_consulting[i])
        };
      };
    });
  }
}

