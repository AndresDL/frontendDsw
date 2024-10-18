import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Components
import { SpecialtyComponent } from './specialty-list/specialty.component.js';
import { SpecialtyAddoreditComponent } from './specialty-addoredit/specialty-addoredit.component.js';


const routes: Routes = [
  {path: '', component: SpecialtyComponent},
  {path: 'add', component: SpecialtyAddoreditComponent},
  {path: 'edit/:id', component: SpecialtyAddoreditComponent},
  //wildcard (dejar siempre a lo ultimo esta ruta)
  {path: '**', redirectTo: '', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
