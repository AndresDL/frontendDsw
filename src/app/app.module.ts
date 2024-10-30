import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppointmentComponent } from './appointment/appointment.component';
import { UserComponent } from './user/user.component';
import { ConsultingComponent } from './consulting-list/consulting.component.js';
import { DoctorConsultingComponent } from './doctor-consulting/doctor-consulting.component';
import { FollowUpComponent } from './follow-up/follow-up.component';
import { TimeTableComponent } from './time-table/time-table.component';
import { SpecialtyComponent } from './specialty-list/specialty.component';
import { FollowupTreatmentComponent } from './followup-treatment/followup-treatment.component';
import { TreatmentComponent } from './treatment/treatment.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { provideHttpClient } from '@angular/common/http';
import { SpecialtyAddoreditComponent } from './specialty-addoredit/specialty-addoredit.component';
import { ConsultingAddoreditComponent } from './consulting-addoredit/consulting-addoredit.component.js';
import { Reactive } from '@angular/core/primitives/signals/index.js';
import { SignInComponent } from './sign-in/sign-in.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavbarComponent } from './navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    AppointmentComponent,
    UserComponent,
    ConsultingComponent,
    DoctorConsultingComponent,
    FollowUpComponent,
    TimeTableComponent,
    SpecialtyComponent,
    FollowupTreatmentComponent,
    TreatmentComponent,
    LoginComponent,
    SpecialtyAddoreditComponent,
    ConsultingAddoreditComponent,
    SignInComponent,
    DashboardComponent,
    NavbarComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    
  ],
  providers: [
    provideClientHydration(),
    provideHttpClient(),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
