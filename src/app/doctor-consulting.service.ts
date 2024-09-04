import { HttpClient } from '@angular/common/http/index.js';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DoctorConsultingService {

  readonly baseUrl = 'http://localhost4200/api'
  constructor(private http: HttpClient) { }
  getDoctorsConsulting(){
    const url =this.baseUrl + 'doctor_consulting';
    return this.http.get<any>(url);
  }

}
