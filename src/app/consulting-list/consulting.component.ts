import { Component, importProvidersFrom, OnInit } from '@angular/core';
import { Consulting } from '../interfaces/consulting.js';
import { ConsultingService } from '../servicies/consulting.service.js';
import { response } from 'express';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-consulting',
  templateUrl: './consulting.component.html',
  styleUrl: './consulting.component.scss'
})
export class ConsultingComponent implements OnInit {
  
  consultingArray: any[] = [];
  consulting: any;
  item:any;
  
  constructor (
    private consultingService: ConsultingService,
    private toastr: ToastrService,
  ){}
  
  ngOnInit() {
    this.getAllConsultings();
  }

  getAllConsultings(){
    this.consultingService.getConsultings().subscribe((consulting) => {
      this.consultingArray = consulting;
    });
  }

  getConsulting(id: number){
    this.consultingService.getConsulting(id).subscribe((consulting) => {
      this.consulting = consulting;
    });
  }

  vigencyConsulting(){
    for(var i in this.consulting.doctors){
      if(this.consulting.doctors[i].vigency != false){
        this.toastr.error(this.consulting.street + ' ' + this.consulting.street_number +
          ' todavia tiene doctores registrados','Error al dar de baja!'
        );
        return;
      }
    }
    this.consulting.vigency = false;
    this.consultingService.updateConsulting(this.consulting).subscribe(() => {
      this.toastr.success(this.consulting.street + ' ' + this.consulting.street_number +
        ' a sido dado de baja exitosamente','Exito al dar de baja!'
      );
      this.getAllConsultings();
    });
  }

  reactivateConsulting(){
    this.consulting.vigency = true;
    this.consultingService.updateConsulting(this.consulting).subscribe(() => {
      this.toastr.success(this.consulting.street + ' ' + this.consulting.street_number +
        ' a sido dado de alta exitosamente','Exito al dar de alta!'
      );
      this.getAllConsultings();
    });
  }
}
