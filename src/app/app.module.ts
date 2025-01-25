import { AppComponent } from './app.component';
import {provideHttpClient, withInterceptors } from '@angular/common/http';

//Components
import { LoginComponent } from './login/login.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ConsultingComponent } from './consulting-list/consulting.component.js';
import { DoctorConsultingComponent } from './doctor-consulting-list/doctor-consulting.component';
import { FollowUpComponent } from './follow-up/follow-up.component';
import { SpecialtyComponent } from './specialty-list/specialty.component';
import { FollowupTreatmentComponent } from './followup-treatment/followup-treatment.component';
import { SpecialtyAddoreditComponent } from './specialty-addoredit/specialty-addoredit.component';
import { ConsultingAddoreditComponent } from './consulting-addoredit/consulting-addoredit.component';
import { AppointmentComponent } from './appointment-list/appointment.component';
import { AppointmentAddComponent } from './appointment-add/appointment-add.component';


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
import localeEs from '@angular/common/locales/es'
import { DatePipe, registerLocaleData } from '@angular/common';
import { RecaptchaModule } from 'ng-recaptcha';


registerLocaleData(localeEs);

@NgModule({
  declarations: [
    AppComponent,
    AppointmentComponent,
    AppointmentAddComponent,
    ConsultingComponent,
    ConsultingAddoreditComponent,
    DashboardComponent,
    DoctorListComponent,
    DoctorSignInComponent,
    DoctorConsultingComponent,
    DoctorConsultingAddoreditComponent,
    FollowUpComponent,
    SpecialtyComponent,
    FollowupTreatmentComponent,
    LoginComponent,
    SpecialtyAddoreditComponent,
    NavbarComponent,
    SignInComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added
    RecaptchaModule, //RecaptchaModule added
  ],
  providers: [
    DatePipe,
    provideClientHydration(),
    provideHttpClient(withInterceptors([addTokenInterceptor])),
    provideToastr()
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
