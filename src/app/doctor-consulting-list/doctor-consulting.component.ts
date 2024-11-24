import { Component } from '@angular/core';
import { DoctorConsulting } from '../interfaces/doctor-consultings';
import { DoctorConsultingService } from '../servicies/doctor-consulting.service';
import { Router } from '@angular/router';
import { DecodingService } from '../servicies/decoding.service';
import { SpecialtyService } from '../servicies/specialty.service';

@Component({
  selector: 'app-doctor-consulting',
  templateUrl: './doctor-consulting.component.html',
  styleUrl: './doctor-consulting.component.scss'
})
export class DoctorConsultingComponent {
  doconsArray: DoctorConsulting[] = [];
  item: any;
  codUser: Number = 0;

  constructor(
    private doconsService: DoctorConsultingService,
    private specialtyService: SpecialtyService,
    private decodingService: DecodingService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.getAllDoctor_consulting();
    this.codUser = this.decodingService.decodeToken();
    console.log(this.doconsArray);
  }

  getAllDoctor_consulting() {
    this.doconsService.getDoctor_consultings().subscribe((doctor_consulting) => {
      this.doconsArray = doctor_consulting;
      console.log(this.doconsArray)
    });
  }

  deleteDoctor_consulting(id: number){
    this.doconsService.deleteSpecialty(id).subscribe((response)=>{
      this.getAllDoctor_consulting();
    }, 
  (error) => console.error ("Error deleting", error));
  }
}

