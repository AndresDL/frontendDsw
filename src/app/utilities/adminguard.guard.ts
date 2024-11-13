import { inject } from '@angular/core';
import { CanActivateFn, Route, Router } from '@angular/router';
import { DecodingService } from '../decoding.service';
import { ToastrService } from 'ngx-toastr';


export const adminguardGuard: CanActivateFn = (route, state) => {

  const toastr: ToastrService = inject(ToastrService)
  const router: Router = inject(Router);
  const decodeService: DecodingService = inject(DecodingService)
  if(decodeService.decodeToken() != 0){
    toastr.error('Usted no esta permitido a ver estos contenidos','Error')
    router.navigate(['/home'])
    
  }
  return true;
};
