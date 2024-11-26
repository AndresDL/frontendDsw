import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Treatment } from '../interfaces/treatment.js';
import { environment } from '../enviroments/environment.js';


@Injectable({
  providedIn: 'root'
})
export class TreatmentService {

  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient){

    this.myAppUrl = environment.endpoint
    this.myApiUrl = environment.endpointtreatment
  }
  
  getTreatments(): Observable<Treatment[]>{
    const url = `${this.myAppUrl}${this.myApiUrl}`
    return this.http.get<any>(url).pipe(map(response => {
      return response.data;
    }));
  }

  getTreatment(id: number): Observable<Treatment> {
    const url = `${this.myAppUrl}${this.myApiUrl}${id}`;
    return this.http.get<any>(url).pipe(map(response => {
      return response.data;
    }));
  }

  addTreatment(Treatment: Treatment): Observable<Treatment> {
    const url = `${this.myAppUrl}${this.myApiUrl}`
    return this.http.post<Treatment>(url, Treatment);
  }

  updateTreatment(Treatment: Treatment): Observable<void> {
    const url = `${this.myAppUrl}${this.myApiUrl}${Treatment.id}`;
    return this.http.put<void>(url, Treatment);
  }

  deleteTreatment(id: number): Observable<void>{
    const url = `${this.myAppUrl}${this.myApiUrl}${id}`;
    return this.http.delete<void>(url);
  }
}