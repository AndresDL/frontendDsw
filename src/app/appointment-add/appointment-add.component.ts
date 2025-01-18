import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DoctorConsulting } from '../interfaces/doctor-consultings';
import { DoctorConsultingService } from '../servicies/doctor-consulting.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DecodingService } from '../servicies/decoding.service';
import { Appointment } from '../interfaces/appointment';
import { AppointmentService } from '../servicies/appointment.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-appointment-add',
  templateUrl: './appointment-add.component.html',
  styleUrl: './appointment-add.component.scss'
})
export class AppointmentAddComponent implements OnInit {

  timefilteredArray = [''];
  appointmentArray: Appointment[] = []
  appointmentForm!: FormGroup;
  doconsId: number;
  operation: string = 'Add ';
  item!: DoctorConsulting;
  user: any;


  constructor(
    private doconsService: DoctorConsultingService,
    private decodeService: DecodingService,
    private appointmentService: AppointmentService,
    private form: FormBuilder,
    private aRouter: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
  ){
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
      this.appointmentForm.get('appoTime')?.setValue(''); //Limpiar appoTime si cambia appoDate
      if (value) {
        this.appointmentForm.get('appoTime')?.enable(); //Habilitado si appoDate tiene valor
      } else {
        this.appointmentForm.get('appoTime')?.disable(); //Deshabilitado si appoDate esta vacio
      }
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

  showtext(): void{
    let timeArray = ['8:00','9:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00',
      '17:00','18:00','19:00','20:00'
    ];
    console.log(timeArray)
    let datefilteredArray: Appointment[] = [];
    let formattedDate = this.appointmentForm.value.appoDate + 'T00:00:00.000Z'
    for(var i in this.appointmentArray){
      if(this.appointmentArray[i].appoDate === formattedDate){
        datefilteredArray.push(this.appointmentArray[i])
      }
    }
    console.log(datefilteredArray)
    console.log(datefilteredArray[0].appoDate)
    for(var j in timeArray) {
      let formattedTime = timeArray[j] + ':00'
      this.timefilteredArray[j] = formattedTime
    }
    for(var j in timeArray) {
      for(var i in datefilteredArray){
        let formattedTime = timeArray[j] + ':00'
        if(datefilteredArray[i].appoTime === formattedTime){
          console.log(datefilteredArray[i].appoTime, formattedTime)
          this.timefilteredArray[j] = formattedTime + ' No disponible'
        }
      }
    }
  }

  getAppointments(){
    this.appointmentService.getAppointments().subscribe((appointment) => {
      for(var i in appointment){
        if(appointment[i].doctor_consulting.id === this.doconsId){
          this.appointmentArray.push(appointment[i])
        }
      }
    })
  }

  createAppointment(){
    if(this.appointmentForm.value.appoTime === ''){
      this.toastr.error('Debe ingresar un horario valido para continuar','Error')
      return;
    }
    if(this.appointmentForm.value.appoTime === 'No disponible'){
      this.toastr.error('El horario se encuentra ocupado','Error')
      return;
    }
    const appointment: Appointment = {
      appoDate: this.appointmentForm.value.appoDate,
      appoTime: this.appointmentForm.value.appoTime,
      assisted: false,
      doctor_consulting: Number(this.item.id),
      patient: Number(this.user.id),
    }
    console.log(appointment);
    this.appointmentService.crearAppointment(appointment).subscribe(() => {
      this.toastr.success('Su turno a sido registrado','Exito')
      this.router.navigate(['/home']);
    });
  }
  
}
