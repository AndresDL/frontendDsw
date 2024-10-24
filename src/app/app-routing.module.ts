import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Components
import { Consulting } from './interfaces/consulting.js';
import { SpecialtyAddoreditComponent } from './specialty-addoredit/specialty-addoredit.component.js';
import { ConsultingComponent } from './consulting-list/consulting.component.js';
import { ConsultingAddoreditComponent } from './consulting-addoredit/consulting-addoredit.component.js';
import { SpecialtyComponent } from './specialty-list/specialty.component.js';

const routes: Routes = [
  {path: '', component: ConsultingComponent},
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
