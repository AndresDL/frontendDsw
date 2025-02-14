import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Doctor } from '../interfaces/doctor.js';
import { environment } from '../enviroments/environment.js';
import { response } from 'express';


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

  //get all doctors
  getDoctors(): Observable<Doctor[]>{
    const url = `${this.myAppUrl}${this.myApiUrl}`;
    return this.http.get<any>(url).pipe(map(response => {
      return response.data;
    }));
  }

  //get a doctor
  getDoctor(id: number): Observable<Doctor> {
    const url = `${this.myAppUrl}${this.myApiUrl}${id}`;
    return this.http.get<any>(url).pipe(map(response => {
      return response.data;
    }));
  }

  //create doctor
  signIn(doctor: Doctor, captcha: string): Observable<any>{
    const url = `${this.myAppUrl}${this.myApiUrl}`
    return this.http.post(url, {doctor,captcha});
  }

  //eliminar doctor
  deleteDoctor(id: number): Observable<void>{
    const url = `${this.myAppUrl}${this.myApiUrl}${id}`;
    return this.http.delete<void>(url);
  }

  //LogIn Doctor
  logInDoc(doctor: Doctor, captcha: String){
    const url = `${this.myAppUrl}${this.myApiUrl}/login`;
    return this.http.post<{token: string}>(url, {doctor, captcha});
  }

  updateDoctor(doctor: Doctor): Observable<void>{ 
    const url = `${this.myAppUrl}${this.myApiUrl}${doctor.id}`;
    return this.http.put<void>(url, {doctor});
  }
}
