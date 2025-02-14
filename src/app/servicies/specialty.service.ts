import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Specialty } from '../interfaces/specialty';
import { environment } from '../enviroments/environment';



@Injectable({
  providedIn: 'root'
})
export class SpecialtyService {

  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient){

    this.myAppUrl = environment.endpoint
    this.myApiUrl = environment.endpointspecialty
  }
  
  getSpecialties(): Observable<Specialty[]>{
    const url = `${this.myAppUrl}${this.myApiUrl}`
    return this.http.get<any>(url).pipe(map(response => {
      return response.data;
    }));
  }

  getSpecialty(id: number): Observable<Specialty> {
    const url = `${this.myAppUrl}${this.myApiUrl}${id}`;
    return this.http.get<any>(url).pipe(map(response => {
      return response.data[0];
    }));
  }

  addSpecialty(specialty: Specialty): Observable<Specialty> {
    const url = `${this.myAppUrl}${this.myApiUrl}`
    return this.http.post<Specialty>(url, specialty);
  }

  updateSpecialty(specialty: Specialty): Observable<void> {
    const url = `${this.myAppUrl}${this.myApiUrl}${specialty.id}`;
    return this.http.put<void>(url, specialty);
  }

  deleteSpecialty(id: number): Observable<void>{
    const url = `${this.myAppUrl}${this.myApiUrl}${id}`;
    return this.http.delete<void>(url);
  }
}
