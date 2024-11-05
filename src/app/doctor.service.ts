import { HttpClient } from '@angular/common/http/index.js';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Doctor } from './interfaces/doctor.js';
import { environment } from './enviroments/environment.js';


@Injectable({
  providedIn: 'root'
})
export class DoctorService {
  private myAppUrl: string;
  private myApiUrl: string;

  
  readonly baseUrl = 'http://localhost4200/doctors'

  constructor(private http: HttpClient) { 
    this.myAppUrl = environment.endpoint
    this.myApiUrl = environment.endpointdoctor
  }
  getDoctors():Observable<Doctor[]> {
    return this.http.get<any>(this.baseUrl).pipe(map((response: { data: any; }) =>{
      return response.data;
    }));
  }

  //create doctor
  signIn(doctor: Doctor): Observable<any>{
    return this.http.post(`${this.myAppUrl}${this.myApiUrl}`, doctor);
  }
}
