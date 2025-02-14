import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../enviroments/environment';
import { Appointment } from '../interfaces/appointment';
import { map, Observable} from 'rxjs';
import { response } from 'express';


@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint
    this.myApiUrl = environment.endpointappo
  }

  //Getone
  getAppointment(id: number): Observable<Appointment>{
    const url = `${this.myAppUrl}${this.myApiUrl}/${id}`;
    return this.http.get<any>(url).pipe(map(response => {
      return response.data[0];
    }));
  }

  //Getall
  getAppointments(){
    const url = `${this.myAppUrl}${this.myApiUrl}`
    return this.http.get<any>(url).pipe(map(response => {
      return response.data;
    }));
  }

  crearAppointment(appointment: Appointment): Observable<any>{
    const url = `${this.myAppUrl}${this.myApiUrl}`
    return this.http.post(url,appointment)
  }

  //GetFilteredbyUserDNI
  getfilteredAppointments(dni: string): Observable<Appointment[]>{
    const url = `${this.myAppUrl}${this.myApiUrl}search/${dni}`;
    return this.http.get<any>(url).pipe(map(response => {
      return response.data;
    }));
  }

  //getFilteredbyDoctorTuition_Number
  getDocfilteredAppointments(tuition: number): Observable<Appointment[]>{
    const url = `${this.myAppUrl}${this.myApiUrl}searchDoc/${tuition}`
    return this.http.get<any>(url).pipe(map(response => {
      return response.data;
    }));
  }

  //Update - estado
  updateAppointment(appointment: Appointment): Observable<void>{
    const url = `${this.myAppUrl}${this.myApiUrl}${appointment.id}`;
    return this.http.put<void>(url, appointment);
  }

  //Delete
  deleteAppointment(id: number): Observable<void>{
    const url = `${this.myAppUrl}${this.myApiUrl}${id}`;
    return this.http.delete<void>(url);
  }
}
