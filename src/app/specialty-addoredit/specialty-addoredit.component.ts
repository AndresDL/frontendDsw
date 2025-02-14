import { Component } from '@angular/core';
import { Specialty } from '../interfaces/specialty';

//Service
import { SpecialtyService } from '../servicies/specialty.service';

//Misc
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router} from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-specialty-addoredit',
  templateUrl: './specialty-addoredit.component.html',
  styleUrl: './specialty-addoredit.component.scss'
})
export class SpecialtyAddoreditComponent {
  specialtyForm: FormGroup;
  id: number;
  operation: string = 'Agregar ';

  constructor(
    private specialtyService: SpecialtyService,
    private form: FormBuilder,
    private aRouter: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
  ){
    this.specialtyForm = this.form.group({
      name: ['', [Validators.required, Validators.maxLength(22)]],
    })
    this.id = Number(aRouter.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void{
    if(this.id != 0){
      //edit
      this.operation = 'Editar ';
      this.getSpecialty(this.id);
    };
  }

  getSpecialty(id: number){
    this.specialtyService.getSpecialty(id).subscribe((specialty: Specialty) => {
    this.specialtyForm.setValue({
      name: specialty.name
    });
    });
  }

  addSpecialty(){
    const specialty: Specialty = {
      name: this.specialtyForm.value.name.trim(),
      vigency: true,
    }
    if(this.id !== 0){
      //edit
     specialty.id = this.id;
     this.specialtyService.updateSpecialty(specialty).subscribe({
      next: () => {
        this.router.navigate(['/specialtyList']);
      },
      error: (e:HttpErrorResponse) => {
        if(e.error.message){
          this.toastr.error('Ya existe una especialidad registrada con ese nombre','Error al modificar!');
        } else {
          this.toastr.error(
            'Paso algo inesperado, contacta un admin!',
            'Error'
          );
        };
      },
     });
    } else {
      //add
      this.specialtyService.addSpecialty(specialty).subscribe({
        next: () => {
          this.router.navigate(['/specialtyList']);
        },
        error: (e: HttpErrorResponse) => {
          if(e.error.message){
            this.toastr.error('Ya existe una especialidad registrada con ese nombre','Error al crear!');
          } else {
            this.toastr.error(
              'Paso algo inesperado, contacta un admin!',
              'Error'
            );
          };
        },
      });
    };
  }
}
