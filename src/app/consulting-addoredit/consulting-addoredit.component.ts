import { Component } from '@angular/core';
import { Consulting } from '../interfaces/consulting';


//Service 
import { ConsultingService } from '../servicies/consulting.service';

//Misc

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-consulting-addoredit',
  templateUrl: './consulting-addoredit.component.html',
  styleUrl: './consulting-addoredit.component.scss',
})
export class ConsultingAddoreditComponent {
  consultingForm: FormGroup;
  id: number;
  operation: string = 'Agregar ';
  
  constructor(
    private consultingService: ConsultingService,
    private form: FormBuilder,
    private aRouter: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
  ) {
    this.consultingForm = this.form.group({
      street: ['', [Validators.required, Validators.maxLength(22)]],
      street_number: [null, Validators.required],
    })
    this.id = Number(aRouter.snapshot.paramMap.get('id'));
  }
  
  ngOnInit(){
    if(this.id !=0){
      //edit
      this.operation = 'Editar ';
      this.getConsulting(this.id);
    }
  }

  getConsulting(id:number){
    this.consultingService.getConsulting(id).subscribe((consulting: Consulting)=> {
      this.consultingForm.setValue({
        street: consulting.street,
        street_number: consulting.street_number,
      })
    })
  }

  addConsulting(){
    const consulting: Consulting = {
      street: this.consultingForm.value.street,
      street_number: Number.parseInt(this.consultingForm.value.street_number),
      vigency: true,
    }
    if(this.id!==0){
      //edit
      consulting.id = this.id
      this.consultingService.updateConsulting(consulting).subscribe(()=>{
        this.router.navigate(['/home/consultingList']);
      })
    } else{
      //add
      this.consultingService.addConsulting(consulting).subscribe(()=>{
        this.router.navigate(['/home/consultingList']);
        this.toastr.success(`El conusltorio en ${this.consultingForm.value.street} 
          ${this.consultingForm.value.street_number} ha sido agregado`,'Consultorio agregado' )
      })
    }
  }
}

