import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../enviroments/environment';
import { response } from 'express';
import { Observable, map } from 'rxjs';
import { DoctorConsulting } from '../interfaces/doctor-consultings';

@Injectable({
  providedIn: 'root'
})
export class DoctorConsultingService {
  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient){
    this.myAppUrl = environment.endpoint
    this.myApiUrl = environment.endpointdocons
  }

  //getall
  getDoctor_consultings(): Observable<DoctorConsulting[]>{
    const url = `${this.myAppUrl}${this.myApiUrl}`;
    return this.http.get<any>(url).pipe(map(response => {
      return response.data;
    }));
  }

  //getone
  getDoctor_consulting(id: number): Observable<DoctorConsulting> {
    const url = `${this.myAppUrl}${this.myApiUrl}${id}`;
    return this.http.get<any>(url).pipe(map(response => {
      return response.data[0];
    }));
  }

  //add
  addDoctor_consulting(doctor_consulting: DoctorConsulting): Observable<DoctorConsulting> {
    const url =`${this.myAppUrl}${this.myApiUrl}` 
    return this.http.post<DoctorConsulting>(url, doctor_consulting);
  }

  //update
  updateDoctor_consulting(doctor_consulting: DoctorConsulting): Observable<void> {
    const url = `${this.myAppUrl}${this.myApiUrl}${doctor_consulting.id}`;
    return this.http.put<void>(url, doctor_consulting);
  }

  //delete
  deleteSpecialty(id: number): Observable<void>{
    const url = `${this.myAppUrl}${this.myApiUrl}${id}`;
    return this.http.delete<void>(url);
  }
}
