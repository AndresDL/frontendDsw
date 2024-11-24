import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {map, Observable} from 'rxjs';
import { response } from 'express';
import { Consulting } from '../interfaces/consulting';

@Injectable({
  providedIn: 'root'
})
export class ConsultingService {

  private baseUrl = 'http://localhost:3000/api/consultings/';
  
  constructor (private http: HttpClient) {}
  
  getConsultings(){
    
    return this.http.get<any>(this.baseUrl).pipe(map(response => {
      return response.data
    }));
  }

  getConsulting (id: number): Observable<Consulting> {
    const url = `${this.baseUrl}${id}`;
    return this.http.get<any>(url).pipe(map(response => {
      return response.data [0];
    }));

  }

  addConsulting (consulting: Consulting): Observable <Consulting> {
    return this.http.post<Consulting>(this.baseUrl, consulting);
  }

  updateConsulting (consulting: Consulting): Observable<void> {
    const url = `${this.baseUrl}${consulting.id}`;
    return this.http.put<void>(url, consulting);
  }
  
  deleteConsulting (id: number): Observable<void>{
    const url = `${this.baseUrl}${id}`;
    return this.http.delete<void>(url);
  }

}


