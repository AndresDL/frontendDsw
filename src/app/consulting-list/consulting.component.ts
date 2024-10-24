import { Component, importProvidersFrom, OnInit } from '@angular/core';
import { Consulting } from '../interfaces/consulting.js';
import { ConsultingService } from '../consulting.service.js';
import { response } from 'express';

@Component({
  selector: 'app-consulting',
  templateUrl: './consulting.component.html',
  styleUrl: './consulting.component.scss'
})
export class ConsultingComponent implements OnInit {
  
  consultingArray: Consulting[] = [];
  item:any;
  
  constructor (
    private consultingService: ConsultingService,
  ){}
  
  ngOnInit() {
    this.getAllConsultings();
  }

  getAllConsultings (){
    this.consultingService.getConsultings().subscribe((consulting)=> {
      console.log('list of consultings', consulting)
      this.consultingArray = consulting;
    });
  }

  deleteConsulting(id: number){
    this.consultingService.deleteConsulting(id).subscribe((response)=>{
      console.log("Cosnultign deleted", response);
    },
  (error)=> console.error ("Error deleting", error));
  }

}
