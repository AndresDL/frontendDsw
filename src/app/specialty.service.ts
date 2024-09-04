import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SpecialtyService {

  readonly baseUrl = 'http://localhost:4200/api/'
  
  constructor(private http: HttpClient){}
  
  getSpecialties(){
    
    const url = this.baseUrl + 'specialty';
    
    return this.http.get<any>(url);

  }


}
