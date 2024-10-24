import { Component } from '@angular/core';
import { Consulting } from '../interfaces/consulting';
import { OnInit } from '@mikro-orm/core';

//Service 
import { ConsultingService } from '../consulting.service';

//Misc

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-consulting-addoredit',
  templateUrl: './consulting-addoredit.component.html',
  styleUrl: './consulting-addoredit.component.scss',
})
export class ConsultingAddoreditComponent {
  consultingForm: FormGroup;
  id: number;
  operation: string = 'Add';
  
  constructor(
    private consultingService: ConsultingService,
    private form: FormBuilder,
    private aRouter: ActivatedRoute,
    private router: Router,
  ) {
    this.consultingForm = this.form.group({
      street: ['', [Validators.required, Validators.maxLength(22)]],
      street_number: [null, Validators.required],
    })
    this.id = Number(aRouter.snapshot.paramMap.get('id'));
    console.log(this.id);

  }
  ngOnInit():void{
    if(this.id !=0){
      //edit
      this.operation = 'Edit';
      this.getConsulting(this.id);
    }
  }

  getConsulting(id:number){
    this.consultingService.getConsulting(id).subscribe((consulting: Consulting)=> {
      console.log(consulting);
      this.consultingForm.setValue({
        street: consulting.street,
        street_number: consulting.street_number,
      })
    })
  }

  addConsulting(){
    const consulting: Consulting = {
      street: this.consultingForm.value.street,
      street_number: this.consultingForm.value.street_number,
    }
    if(this.id!==0){
      //edit
      consulting.id = this.id
      this.consultingService.updateConsulting(consulting).subscribe(()=>{
        this.router.navigate(['/']);
      })
    } else{
      //add
      this.consultingService.addConsulting(consulting).subscribe(()=>{
        this.router.navigate(['/']);
      })
    }
  }
}
