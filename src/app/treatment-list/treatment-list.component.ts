import { Component, OnInit } from '@angular/core';
import { Treatment } from '../interfaces/treatment';
import { TreatmentService } from '../treatment.service';
import { response } from 'express';

@Component({
  selector: 'app-treatment',
  templateUrl: './treatment-list.component.html',
  styleUrl: './treatment-list.component.scss'
})
export class TreatmentComponent implements OnInit{
  treatmentArray: Treatment[] = [];
  item: any;

  constructor(
    private treatmentService: TreatmentService,
  ) {}

  ngOnInit() {
    this.getAllTreatments();
  }

  getAllTreatments() {
    this.treatmentService.getTreatments().subscribe((treatment) => {
      console.log('list of treatments:', treatment)
      this.treatmentArray = treatment;
    });
  }



  deleteTreatment(id: number){
    this.treatmentService.deleteTreatment(id).subscribe((response)=>{
      console.log("treatment deleted", response);
    }, 
  (error) => console.error ("Error deleting", error));
  }
  
}
