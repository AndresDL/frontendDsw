import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Doctor } from '../interfaces/doctor.js';
import { environment } from '../enviroments/environment.js';


@Injectable({
  providedIn: 'root'
})
export class DoctorService {
  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient) { 
    this.myAppUrl = environment.endpoint
    this.myApiUrl = environment.endpointdoctor
  }

  getDoctors(): Observable<Doctor[]>{
    const url = `${this.myAppUrl}${this.myApiUrl}`;
    return this.http.get<any>(url).pipe(map(response => {
      return response.data;
    }));
  }

  //create doctor
  signIn(doctor: Doctor): Observable<any>{
    const url = `${this.myAppUrl}${this.myApiUrl}`
    return this.http.post(url, doctor);
  }

  //eliminar doctor
  deleteDoctor(id: number): Observable<void>{
    const url = `${this.myAppUrl}${this.myApiUrl}${id}`;
    return this.http.delete<void>(url);
  }
}
