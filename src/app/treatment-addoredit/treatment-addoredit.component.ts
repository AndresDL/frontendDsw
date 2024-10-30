import { Component } from '@angular/core';
import { Treatment } from '../interfaces/treatment';
import { OnInit } from '@angular/core';

//Service
import { TreatmentService } from '../treatment.service';

//Misc
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-treatment-addoredit',
  templateUrl: './treatment-addoredit.component.html',
  styleUrl: './treatment-addoredit.component.scss'
})
export class TreatmentAddoreditComponent {
  treatmentForm: FormGroup;
  id: number;
  operation: string = 'Add ';

  constructor(
    private treatmentService: TreatmentService,
    private form: FormBuilder,
    private aRouter: ActivatedRoute,
    private router: Router,
  ){
    this.treatmentForm = this.form.group({
      name: ['', [Validators.required, Validators.maxLength(22)]],
      price: [null, Validators.required],
    })
    this.id = Number(aRouter.snapshot.paramMap.get('id'));
    console.log(this.id);

  }

  ngOnInit(): void{
    if(this.id != 0){
      //edit
      this.operation = 'Edit ';
      this.getTreatment(this.id);
    }
  }

  getTreatment(id: number){
    this.treatmentService.getTreatment(id).subscribe((treatment: Treatment) => {
    this.treatmentForm.setValue({
      name: treatment.name,
      price: treatment.price,
    })
    })
  }

   
  addTreatment(){
    const treatment: Treatment = {
      name: this.treatmentForm.value.name,
      price: this.treatmentForm.value.price,
    }
    if(this.id !== 0){
      //edit
     treatment.id = this.id
     this.treatmentService.updateTreatment(treatment).subscribe(() =>{
      this.router.navigate(['/']);
     })

    } else {
      //add
      this.treatmentService.addTreatment(treatment).subscribe(() => {
        this.router.navigate(['/']);
      })
    }
  }



 



}