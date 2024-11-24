import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../enviroments/environment';
import { Appointment } from '../interfaces/appointment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint
    this.myApiUrl = environment.endpointuser
  }

  addAppointment(appointment: Appointment): Observable<Appointment> {
    const url = `${this.myAppUrl}${this.myApiUrl}`
    return this.http.post<Appointment>(url,appointment);
  }

  

}