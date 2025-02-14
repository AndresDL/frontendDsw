import { CanActivateFn, Router } from '@angular/router';
import {inject} from '@angular/core';
import { ToastrService } from 'ngx-toastr';

export const authGuard: CanActivateFn = (route, state) => {
  const router: Router = inject(Router);
  const toastr : ToastrService = inject(ToastrService)
  const token = sessionStorage.getItem('token') 
  if(token == undefined){
    toastr.error('Debe iniciar sesión para continuar','Error');
    router.navigate(['/login']);
  }
  return true;
};
