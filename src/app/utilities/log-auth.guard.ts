import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

export const logAuthGuard: CanActivateFn = (route, state) => {
  const router: Router = inject(Router);
  const toastr : ToastrService = inject(ToastrService)
  const token = sessionStorage.getItem('token') 
  if(token != undefined){
    toastr.error('Debe cerrar sesión para salir','Error');
    router.navigate(['/home']);
  }
  return true;
};
