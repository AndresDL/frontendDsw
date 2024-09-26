import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Specialty } from './specialty/specialty';
import { response } from 'express';


@Injectable({
  providedIn: 'root'
})
export class SpecialtyService {

  readonly baseUrl = 'http://localhost:3000/api/specialties';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type' : 'application/json' })
  }
  
  constructor(private http: HttpClient){}
  
  getSpecialties(): Observable<Specialty[]>{
    return this.http.get<Specialty[]>(this.baseUrl).pipe(map((response: any) => response.specialties));
  }

  getSpecialty(id: number): Observable<Specialty> {
    const url = `${this.baseUrl}?id=${id}`;
    return this.http.get<Specialty>(url);
  }

  addSpecialty(specialty: Specialty): Observable<Specialty> {
    return this.http.post<Specialty>(this.baseUrl, specialty, this.httpOptions);
  }

  updateSpecialty(specialty: Specialty): Observable<Specialty> {
    const url = `${this.baseUrl}?id=${specialty.id}`;
    return this.http.put<Specialty>(url, specialty, this.httpOptions);
  }

  deleteSpecialty(id: number): Observable<{}> {
    const url = `${this.baseUrl}$id=${id}`;
    return this.http.delete(url, this.httpOptions);
  }
}
