import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Specialty } from './interfaces/specialty';
import { response } from 'express';


@Injectable({
  providedIn: 'root'
})
export class SpecialtyService {

  private baseUrl = 'http://localhost:3000/api/specialties/';
  
  constructor(private http: HttpClient){}
  
  getSpecialties(): Observable<Specialty[]>{
    return this.http.get<any>(this.baseUrl).pipe(map(response => {
      return response.data;
    }));
  }

  getSpecialty(id: number): Observable<Specialty> {
    const url = `${this.baseUrl}${id}`;
    return this.http.get<any>(url).pipe(map(response => {
      return response.data[0];
    }));
  }

  addSpecialty(specialty: Specialty): Observable<Specialty> {
    return this.http.post<Specialty>(this.baseUrl, specialty);
  }

  updateSpecialty(specialty: Specialty): Observable<void> {
    const url = `${this.baseUrl}${specialty.id}`;
    return this.http.put<void>(url, specialty);
  }

  deleteSpecialty(id: number): Observable<void>{
    const url = `${this.baseUrl}${id}`;
    return this.http.delete<void>(url);
  }
}
