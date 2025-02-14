import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DoctorConsulting } from '../interfaces/doctor-consultings';
import { DoctorConsultingService } from '../servicies/doctor-consulting.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DecodingService } from '../servicies/decoding.service';
import { Appointment } from '../interfaces/appointment';
import { AppointmentService } from '../servicies/appointment.service';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-appointment-add',
  templateUrl: './appointment-add.component.html',
  styleUrl: './appointment-add.component.scss'
})
export class AppointmentAddComponent implements OnInit {

  timefilteredArray = [''];
  appointmentArray: Appointment[] = [];
  appointmentForm!: FormGroup;
  doconsId: number;
  operation: string = 'Add ';
  item!: DoctorConsulting;
  user: any;
  currentDate: any;
  text?:string;

  constructor(
    private doconsService: DoctorConsultingService,
    private decodeService: DecodingService,
    private appointmentService: AppointmentService,
    private form: FormBuilder,
    private aRouter: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private datePipe: DatePipe,
  ){
    this.currentDate = this.datePipe.transform(new Date, 'yyyy-MM-dd')
    this.appointmentForm = this.form.group({
      appoDate: [null, [Validators.required]],
      appoTime: [{ value: '', disabled: true }],
      doctor_consulting: [null, [Validators.required]],
      patient: [null, [Validators.required]]
    })
    this.doconsId = Number(aRouter.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    this.appointmentForm.get('appoDate')?.valueChanges.subscribe(value => {
      if(value < this.currentDate){
        this.toastr.error('Ingrese una fecha valida','Error');
        this.appointmentForm.get('appoTime')?.disable(); 
      } else if (value === this.currentDate) {
        this.toastr.error('Los turnos deben ser programados con un dia de anticipación','Error')
        this.appointmentForm.get('appoTime')?.disable(); 
      } else {
        this.appointmentForm.get('appoTime')?.setValue(''); //Limpiar appoTime si cambia appoDate
        if (value) {
          this.appointmentForm.get('appoTime')?.enable(); //Habilitado si appoDate tiene valor
        } else {
          this.appointmentForm.get('appoTime')?.disable(); //Deshabilitado si appoDate esta vacio o es invalido
        };
      };
    });
    this.getAppointments();
    this.getDoctor_consulting(this.doconsId);
    this.user = this.decodeService.decodeToken();
  }
  getDoctor_consulting(id: number){
    this.doconsService.getDoctor_consulting(id).subscribe((doctor_consulting: DoctorConsulting) => {
      this.item = doctor_consulting;
    })
  }

  onDateChange(){
    let timeArray = ['08:00:00','09:00:00','10:00:00','11:00:00','12:00:00','13:00:00','14:00:00','15:00:00','16:00:00',
      '17:00:00','18:00:00','19:00:00','20:00:00'
    ];
    let datefilteredArray: Appointment[] = [];
    let formattedDate = this.appointmentForm.value.appoDate + 'T00:00:00.000Z';
    for(var i in timeArray){
      this.timefilteredArray[i] = timeArray[i].replace(':00:00',':00');
    }
    for(var i in this.appointmentArray){
      if(this.appointmentArray[i].appoDate === formattedDate){
        datefilteredArray.push(this.appointmentArray[i]);
      };
    };
    if(datefilteredArray){
      for(var j in timeArray) {
        for(var i in datefilteredArray){
          if(datefilteredArray[i].appoTime === timeArray[j] && 
            datefilteredArray[i].assisted === 'Vigente'
          ){
            this.timefilteredArray[j] = this.timefilteredArray[j] + ' No disponible';
          };
        };
      };
    };
  }

  getAppointments(){
    this.appointmentService.getAppointments().subscribe((appointment) => {
      for(var i in appointment){
        if(appointment[i].doctor_consulting.id === this.doconsId){
          this.appointmentArray.push(appointment[i]);
        };
      };
    });
  }

  createAppointment(){
    if(this.appointmentForm.value.appoDate === null){
      this.toastr.error('Debe ingresar una fecha valida para continuar','Error');
      return;
    };
    if(this.appointmentForm.value.appoTime === ''){
      this.toastr.error('Debe ingresar un horario valido para continuar','Error');
      return;
    };
    if(this.appointmentForm.value.appoTime.includes('No disponible')){
      this.toastr.error('El horario se encuentra ocupado','Error');
      return;
    };
    const appointment: Appointment = {
      appoDate: this.appointmentForm.value.appoDate,
      appoTime: this.appointmentForm.value.appoTime,
      assisted: 'Vigente',
      doctor_consulting: Number(this.item.id),
      patient: Number(this.user.id),
    };
    this.appointmentService.crearAppointment(appointment).subscribe(() => {
      this.toastr.success('Su turno a sido registrado','Exito');
      this.router.navigate(['/home']);
    });
  };  
}
