import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppointmentComponent } from './appointment/appointment.component';
import { UserComponent } from './user/user.component';
import { ConsultingComponent } from './consulting/consulting.component';
import { DoctorConsultingComponent } from './doctor-consulting/doctor-consulting.component';
import { FollowUpComponent } from './follow-up/follow-up.component';
import { TimeTableComponent } from './time-table/time-table.component';
import { SpecialtyComponent } from './specialty/specialty.component';
import { FollowupTreatmentComponent } from './followup-treatment/followup-treatment.component';
import { TreatmentComponent } from './treatment/treatment.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { provideHttpClient } from '@angular/common/http';

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
