import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConsultingService {

  readonly baseUrl = 'http://localhost:4200/api'
  
  constructor (private http: HttpClient) {}
  
  getConsultings(){
    
    const url = this.baseUrl + 'consulting'
    
    return this.http.get<any>(url);
  }


