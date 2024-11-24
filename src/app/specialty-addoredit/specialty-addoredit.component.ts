import { Component } from '@angular/core';
import { Specialty } from '../interfaces/specialty';
import { OnInit } from '@angular/core';

//Service
import { SpecialtyService } from '../servicies/specialty.service';

//Misc
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-specialty-addoredit',
  templateUrl: './specialty-addoredit.component.html',
  styleUrl: './specialty-addoredit.component.scss'
})
export class SpecialtyAddoreditComponent {
  specialtyForm: FormGroup;
  id: number;
  operation: string = 'Add ';

  constructor(
    private specialtyService: SpecialtyService,
    private form: FormBuilder,
    private aRouter: ActivatedRoute,
    private router: Router,
  ){
    this.specialtyForm = this.form.group({
      name: ['', [Validators.required, Validators.maxLength(22)]],
      price: [null, Validators.required],
    })
    this.id = Number(aRouter.snapshot.paramMap.get('id'));

  }

  ngOnInit(): void{
    if(this.id != 0){
      //edit
      this.operation = 'Edit ';
      this.getSpecialty(this.id);
    }
  }

  getSpecialty(id: number){
    this.specialtyService.getSpecialty(id).subscribe((specialty: Specialty) => {
    this.specialtyForm.setValue({
      name: specialty.name,
      price: specialty.price,
    })
    })
  }

   
  addSpecialty(){
    const specialty: Specialty = {
      name: this.specialtyForm.value.name,
      price: this.specialtyForm.value.price,
    }
    if(this.id !== 0){
      //edit
     specialty.id = this.id
     this.specialtyService.updateSpecialty(specialty).subscribe(() =>{
      this.router.navigate(['/specialtyList']);
     })

    } else {
      //add
      this.specialtyService.addSpecialty(specialty).subscribe(() => {
        this.router.navigate(['/specialtyList']);
      })
    }
  }
}
