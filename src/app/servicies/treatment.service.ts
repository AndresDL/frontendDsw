import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Treatment } from '../interfaces/treatment.js';
import { response } from 'express';


@Injectable({
  providedIn: 'root'
})
export class TreatmentService {

  private baseUrl = 'http://localhost:3000/api/treatments/';
  
  constructor(private http: HttpClient){}
  
  getTreatments(): Observable<Treatment[]>{
    return this.http.get<any>(this.baseUrl).pipe(map(response => {
      return response.data;
    }));
  }

  getTreatment(id: number): Observable<Treatment> {
    const url = `${this.baseUrl}${id}`;
    return this.http.get<any>(url).pipe(map(response => {
      return response.data;
    }));
  }

  addTreatment(Treatment: Treatment): Observable<Treatment> {
    return this.http.post<Treatment>(this.baseUrl, Treatment);
  }

  updateTreatment(Treatment: Treatment): Observable<void> {
    const url = `${this.baseUrl}${Treatment.id}`;
    return this.http.put<void>(url, Treatment);
  }

  deleteTreatment(id: number): Observable<void>{
    const url = `${this.baseUrl}${id}`;
    return this.http.delete<void>(url);
  }
}