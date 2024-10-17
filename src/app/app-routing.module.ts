import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Components
import { LoginComponent } from './login/login.component.js';
import { SpecialtyComponent } from './specialty/specialty.component.js';

const routes: Routes = [
  
  {path: 'login',component: LoginComponent},
  {path: ':id', component: SpecialtyComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
