import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Specialty } from './specialty/specialty';
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
    const url = `${this.baseUrl}id=${id}`;
    console.log(url);
    return this.http.get<Specialty>(url);
  }

  addSpecialty(specialty: Specialty): Observable<Specialty> {
    return this.http.post<Specialty>(this.baseUrl, specialty);
  }

  updateSpecialty(specialty: Specialty): Observable<Specialty> {
    const url = `${this.baseUrl}?id=${specialty.id}`;
    return this.http.put<Specialty>(url, specialty);
  }

  deleteSpecialty(id: number): Observable<Specialty>{
    const url = `${this.baseUrl}$id=${id}`;
    return this.http.delete<Specialty>(url);
  }
}
