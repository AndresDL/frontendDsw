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
import { DoctorConsultingComponent } from './doctor-consulting-list/doctor-consulting.component.js';
import { DoctorConsultingAddoreditComponent } from './doctor-consulting-addoredit/doctor-consulting-addoredit.component.js';
import { AppointmentAddComponent } from './appointment-add/appointment-add.component.js';
import { AppointmentComponent } from './appointment-list/appointment.component.js';


const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'signIn', component: SignInComponent},
  {path: 'DocsignIn', component: DoctorSignInComponent},
  {path: 'home', component: DashboardComponent, canActivate: [authGuard]},
  {path: 'home', canActivate:[adminguardGuard], children: [
    {path: 'addSpecialty', component: SpecialtyAddoreditComponent},//Admin
    {path: 'editSpecialty/:id', component: SpecialtyAddoreditComponent},//Admin
    {path: 'consultingList', component: ConsultingComponent},//Admin
    {path: 'addConsulting', component: ConsultingAddoreditComponent},//Admin
    {path: 'editConsulting/:id', component: ConsultingAddoreditComponent},//Admin
    {path: 'treatmentList', component: TreatmentComponent},//Admin
    {path: 'addTreatment', component: TreatmentAddoreditComponent},//Admin
    {path: 'editTreatment/:id', component: TreatmentAddoreditComponent},//Admin
    {path: 'doctorList', component: DoctorListComponent},//Admin
    {path: 'addDocons', component: DoctorConsultingAddoreditComponent},//Admin
    {path: 'editDocons/:id', component: DoctorConsultingAddoreditComponent},//Admin
  ]},
  {path: 'appointmentList', component: AppointmentComponent},//User
  {path: 'specialtyList', component: SpecialtyComponent},//Admin&User
  {path: 'doconsList', component: DoctorConsultingComponent},//Admin&User
  {path: 'doconsList/:name', component: DoctorConsultingComponent},//User
  {path: 'addAppointment/:id', component:AppointmentAddComponent},//User
  //wildcard (dejar siempre a lo ultimo esta ruta)
  //{path: '**', redirectTo: '', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
