import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Components
import { SpecialtyAddoreditComponent } from './specialty-addoredit/specialty-addoredit.component.js';
import { ConsultingComponent } from './consulting-list/consulting.component.js';
import { ConsultingAddoreditComponent } from './consulting-addoredit/consulting-addoredit.component.js';
import { SpecialtyComponent } from './specialty-list/specialty.component.js';
import { LoginComponent } from './login/login.component.js';
import { SignInComponent } from './sign-in/sign-in.component.js';
import { DashboardComponent } from './dashboard/dashboard.component.js';
import { authGuard } from './utilities/auth.guard.js';
import { DoctorSignInComponent } from './doctor-sign-in/doctor-sign-in.component.js';
import { TreatmentComponent } from './treatment-list/treatment-list.component.js';
import { TreatmentAddoreditComponent } from './treatment-addoredit/treatment-addoredit.component.js';
import { adminguardGuard } from './utilities/adminguard.guard.js';
import { DoctorListComponent } from './doctor-list/doctor-list.component.js';


const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'signIn', component: SignInComponent},
  {path: 'DocsignIn', component: DoctorSignInComponent},
  {path: 'home', component: DashboardComponent, canActivate: [authGuard]},
  {path: 'home', canActivate:[adminguardGuard], children: [
    {path: 'specialtyList', component: SpecialtyComponent},//admin
    {path: 'addSpecialty', component: SpecialtyAddoreditComponent},//admin
    {path: 'editSpecialty/:id', component: SpecialtyAddoreditComponent},//Admin
    {path: 'consultingList', component: ConsultingComponent},//admin
    {path: 'addConsulting', component: ConsultingAddoreditComponent},//Admin
    {path: 'editConsulting/:id', component: ConsultingAddoreditComponent},//Admin
    {path: 'treatmentList', component: TreatmentComponent},//Admin
    {path: 'addTreatment', component: TreatmentAddoreditComponent},//Admin
    {path: 'editTreatment/:id', component: TreatmentAddoreditComponent},//Admin
    {path:'doctorList', component: DoctorListComponent},//admin
  ]},
  
  //wildcard (dejar siempre a lo ultimo esta ruta)
  {path: '**', redirectTo: '', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
