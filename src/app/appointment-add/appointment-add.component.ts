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
  appointmentArray!: Appointment[]
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
      appoTime: [null, [Validators.required]],
      doctor_consulting: [null, [Validators.required]],
      patient: [null, [Validators.required]]
    })
    this.doconsId = Number(aRouter.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    this.getAppointments();
    this.getDoctor_consulting(this.doconsId);
    this.user = this.decodeService.decodeToken();
    console.log(this.user);
  }

  getDoctor_consulting(id: number){
    this.doconsService.getDoctor_consulting(id).subscribe((doctor_consulting: DoctorConsulting) => {
      this.item = doctor_consulting;
      console.log(this.item);
    })
  }

  getAppointments(){
    this.appointmentService.getAppointments().subscribe((appointment) => {
      this.appointmentArray = appointment;
      console.log(this.appointmentArray);
    })
  }

  createAppointment(){
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
