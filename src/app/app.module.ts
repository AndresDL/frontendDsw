import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AppointmentComponent } from './appointment/appointment.component';
import { UserComponent } from './user/user.component';
import { ConsultingComponent } from './consulting/consulting.component';
import { DoctorConsultingComponent } from './doctor-consulting/doctor-consulting.component';
import { FollowUpComponent } from './follow-up/follow-up.component';
import { TimeTableComponent } from './time-table/time-table.component';
import { SpecialtyComponent } from './specialty/specialty.component';
import { FollowupTreatmentComponent } from './followup-treatment/followup-treatment.component';
import { TreatmentComponent } from './treatment/treatment.component';
import { TreatmentPriceComponent } from './treatment-price/treatment-price.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AppointmentComponent,
    UserComponent,
    ConsultingComponent,
    DoctorConsultingComponent,
    FollowUpComponent,
    TimeTableComponent,
    SpecialtyComponent,
    FollowupTreatmentComponent,
    TreatmentComponent,

    TreatmentPriceComponent,
    LoginComponent
    

    TreatmentPriceComponent

  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
