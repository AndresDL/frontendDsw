import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TreatmentService {

  readonly baseUrl = 'http://localhost:4200/api/'
  
  constructor(private http: HttpClient){}
  
  getTreatments(){
    
    const url = this.baseUrl + 'treatment';
    
    return this.http.get<any>(url);

  }


}