import { HttpClient } from '@angular/common/http/index.js';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Doctor } from './interfaces/doctor.js';


@Injectable({
  providedIn: 'root'
})
export class DoctorService {
  signIn(user: Doctor) {
    throw new Error('Method not implemented.');
  }
  readonly baseUrl = 'http://localhost4200/doctors'

  constructor(private http: HttpClient) { }
  getDoctors():Observable<Doctor[]> {
    return this.http.get<any>(this.baseUrl).pipe(map((response: { data: any; }) =>{
      return response.data;
    }));
  }
}
