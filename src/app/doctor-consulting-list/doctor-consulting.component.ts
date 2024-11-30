import { Component } from '@angular/core';
import { DoctorConsulting } from '../interfaces/doctor-consultings';
import { DoctorConsultingService } from '../servicies/doctor-consulting.service';
import { ActivatedRoute, Router } from '@angular/router';
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
  user: any;
  name!: string

  constructor(
    private doconsService: DoctorConsultingService,
    private decodingService: DecodingService,
    private aRouter: ActivatedRoute,
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

  deleteDoctor_consulting(id: number){
    this.doconsService.deleteSpecialty(id).subscribe((response)=>{
      this.getAllDoctor_consulting();
    }, 
  (error) => console.error ("Error deleting", error));
  }

  filterDoctor_consultings(){
    this.doconsService.getfilteredDoctor_consultings(this.name).subscribe((doctor_consulting) => {
      this.doconsArray = doctor_consulting
    });
  }
}

