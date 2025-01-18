import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DoctorConsultingService } from '../servicies/doctor-consulting.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DoctorConsulting } from '../interfaces/doctor-consultings';
import { ToastrService } from 'ngx-toastr';
import { DoctorService } from '../servicies/doctor.service';
import { ConsultingService } from '../servicies/consulting.service';
import { Doctor } from '../interfaces/doctor';
import { Consulting } from '../interfaces/consulting';



@Component({
  selector: 'app-doctor-consulting-addoredit',
  templateUrl: './doctor-consulting-addoredit.component.html',
  styleUrl: './doctor-consulting-addoredit.component.scss'
})
export class DoctorConsultingAddoreditComponent {
  doconsForm: FormGroup;
  doctorArray: Doctor [] = [];
  consultingArray: Consulting [] = [];
  id: number;
  operation: string = 'Agregar ';

  constructor(
    private doconsService: DoctorConsultingService,
    private doctorService: DoctorService,
    private consultingService: ConsultingService,
    private form: FormBuilder,
    private aRouter: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
  ){
    this.doconsForm = this.form.group({
      doctor: [null, Validators.required],
      consulting: [null, Validators.required],
    })
    this.id = Number(aRouter.snapshot.paramMap.get('id'));

  }

  ngOnInit(): void{
    this.getAllDoctors();
    this.getAllConsultings();
    if(this.id != 0){
      //edit
      this.operation = 'Editar ';
      this.getDoctor_consulting(this.id);
    }
  }

  getAllDoctors(){
    this.doctorService.getDoctors().subscribe((doctor) => {
      this.doctorArray = doctor;
    });
  }

  getAllConsultings(){
    this.consultingService.getConsultings().subscribe((consulting) => {
      this.consultingArray = consulting;
    });
  }

  getDoctor_consulting(id: number){
    this.doconsService.getDoctor_consulting(id).subscribe((doctor_consulting: DoctorConsulting) => {
    this.doconsForm.setValue({
      doctor: doctor_consulting.doctor.id,
      consulting: doctor_consulting.consulting.id,
    })
    })
  }

  addDoctor_consulting(){
    const doctor_consulting: DoctorConsulting = {
      vigency: true,
      doctor: Number.parseInt(this.doconsForm.value.doctor),
      consulting: Number.parseInt(this.doconsForm.value.consulting),
    }
    if(this.id !== 0){
      //edit
     doctor_consulting.id = this.id
     this.doconsService.updateDoctor_consulting(doctor_consulting).subscribe(() =>{
      this.toastr.success('La instancia ha sido editada exitosamente','Instancia editada')
      this.router.navigate(['/home']);
     })

    } else {
      //add
      this.doconsService.addDoctor_consulting(doctor_consulting).subscribe(() => {
        this.toastr.success('La instancia ha sido agregada exitosamente','Instancia agregada')
        this.router.navigate(['/home']);
      })
    }
  }
}
