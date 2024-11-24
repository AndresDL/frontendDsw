import { Component, OnInit } from '@angular/core';
import { Specialty } from '../interfaces/specialty';
import { SpecialtyService } from '../servicies/specialty.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DoctorConsulting } from '../interfaces/doctor-consultings';
import { DoctorConsultingService } from '../servicies/doctor-consulting.service';

@Component({
  selector: 'app-appointment-add',
  templateUrl: './appointment-add.component.html',
  styleUrl: './appointment-add.component.scss'
})
export class AppointmentAddComponent implements OnInit {
  doconsArray: DoctorConsulting[] = [];
  item: any;
  name!: string;

  constructor(
    private doconsService: DoctorConsultingService,
    private router: Router,
    private aRouter: ActivatedRoute,
  ) {
    this.name = String(aRouter.snapshot.paramMap.get('name'));
    console.log(this.name);
  }

  ngOnInit(): void {
    this.getDoctor_consultings()
  }

  getDoctor_consultings(){
    this.doconsService.getfilteredDoctor_consultings(this.name).subscribe((doctor_consulting) => {
      this.doconsArray = doctor_consulting
    });
  }



  
}
