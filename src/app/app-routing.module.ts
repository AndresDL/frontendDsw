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

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'signIn', component: SignInComponent},
  {path: 'home', component: DashboardComponent},
  {path: 'addSpecialty', component: SpecialtyAddoreditComponent},
  {path: 'editSpecialty/:id', component: SpecialtyAddoreditComponent},
  {path: 'addConsulting', component: ConsultingAddoreditComponent},
  {path: 'editConsulting/:id', component: ConsultingAddoreditComponent},
  //wildcard (dejar siempre a lo ultimo esta ruta)
  {path: '**', redirectTo: '', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
