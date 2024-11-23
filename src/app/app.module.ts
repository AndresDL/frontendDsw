import { AppComponent } from './app.component';
import {provideHttpClient, withInterceptors } from '@angular/common/http';
import { Reactive } from '@angular/core/primitives/signals/index.js';

//Components
import { LoginComponent } from './login/login.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ConsultingComponent } from './consulting-list/consulting.component.js';
import { DoctorConsultingComponent } from './doctor-consulting-list/doctor-consulting.component';
import { FollowUpComponent } from './follow-up/follow-up.component';
import { TimeTableComponent } from './time-table/time-table.component';
import { SpecialtyComponent } from './specialty-list/specialty.component';
import { FollowupTreatmentComponent } from './followup-treatment/followup-treatment.component';
import { TreatmentComponent } from './treatment-list/treatment-list.component';
import { SpecialtyAddoreditComponent } from './specialty-addoredit/specialty-addoredit.component';
import { ConsultingAddoreditComponent } from './consulting-addoredit/consulting-addoredit.component.js';
import { TreatmentAddoreditComponent } from './treatment-addoredit/treatment-addoredit.component.js';
import { AppointmentComponent } from './appointment-list/appointment.component';


//Modules
import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideToastr, ToastrModule } from 'ngx-toastr';
import { DoctorSignInComponent } from './doctor-sign-in/doctor-sign-in.component';
import { DoctorListComponent } from './doctor-list/doctor-list.component';
import { addTokenInterceptor } from './utilities/add-token.interceptor';
import { DoctorConsultingAddoreditComponent } from './doctor-consulting-addoredit/doctor-consulting-addoredit.component';


@NgModule({
  declarations: [
    AppComponent,
    AppointmentComponent,
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
    NavbarComponent,
    DashboardComponent,
    TreatmentAddoreditComponent,
    SignInComponent,
    DoctorSignInComponent,
    DoctorListComponent,
    DoctorConsultingAddoreditComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added
    
  ],
  providers: [
    provideClientHydration(),
    provideHttpClient(withInterceptors([addTokenInterceptor])),
    provideToastr(),
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
