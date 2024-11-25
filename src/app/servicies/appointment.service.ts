import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../enviroments/environment';
import { Appointment } from '../interfaces/appointment';
import { catchError, map, Observable, throwError } from 'rxjs';
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
}
