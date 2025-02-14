import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {map, Observable} from 'rxjs';
import { Consulting } from '../interfaces/consulting';
import { environment } from '../enviroments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConsultingService {

  private myAppUrl: string;
  private myApiUrl: string;

  constructor (private http: HttpClient) {
    this.myAppUrl = environment.endpoint
    this.myApiUrl = environment.endpointconsulting
  }
  
  getConsultings(){
    const url = `${this.myAppUrl}${this.myApiUrl}` 
    return this.http.get<any>(url).pipe(map(response => {
      return response.data
    }));
  }

  getConsulting (id: number): Observable<Consulting> {
    const url = `${this.myAppUrl}${this.myApiUrl}${id}`;
    return this.http.get<any>(url).pipe(map(response => {
      return response.data [0];
    }));

  }

  addConsulting (consulting: Consulting): Observable <Consulting> {
    const url = `${this.myAppUrl}${this.myApiUrl}` 
    return this.http.post<Consulting>(url, consulting);
  }

  updateConsulting (consulting: Consulting): Observable<void> {
    const url = `${this.myAppUrl}${this.myApiUrl}${consulting.id}`;
    return this.http.put<void>(url, consulting);
  }
  
  deleteConsulting (id: number): Observable<void>{
    const url = `${this.myAppUrl}${this.myApiUrl}${id}`;
    return this.http.delete<void>(url);
  }

}


