import { AbstractControl, ControlContainer, ValidationErrors, ValidatorFn } from "@angular/forms";

export const matchpass: ValidatorFn = (control: AbstractControl): ValidationErrors|null =>{
    let password = control.get('password');
    let repassword = control.get('repassword');
    if(password && repassword && password?.value != repassword?.value){
       return {
           passwordmatcherror : true }
    }
   return null;
}