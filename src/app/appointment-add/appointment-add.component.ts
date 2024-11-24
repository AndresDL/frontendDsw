import { Component } from '@angular/core';
import { Specialty } from '../interfaces/specialty';
import { SpecialtyService } from '../servicies/specialty.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DoctorConsulting } from '../interfaces/doctor-consultings';

@Component({
  selector: 'app-appointment-add',
  templateUrl: './appointment-add.component.html',
  styleUrl: './appointment-add.component.scss'
})
export class AppointmentAddComponent {
  doconsArray: DoctorConsulting[] = [];
  specialtyArray: Specialty[] = [];
  item: any;
  name!: string;

  constructor(
    private specialtyService: SpecialtyService,
    private router: Router,
    private aRouter: ActivatedRoute,
  ) {
    this.name = String(aRouter.snapshot.paramMap.get('name'));
    console.log(this.name);
  }

  
}
