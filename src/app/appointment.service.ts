import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  readonly baseUrl = 'http://localhost:4200/api'
  
  constructor (private http: HttpClient) {}
  
  getAppointments(){
    
    const url = this.baseUrl + 'appointment'
    
    return this.http.get<any>(url);
  }

}
