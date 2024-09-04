import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FollowupTreatmentService {
  
  readonly baseUrl = 'http://localhost:4200/api'
  
  constructor (private http: HttpClient) {}
  
  getFollowUpTreatments () {
  
    const url = this.baseUrl + 'followup_treatment'
  
    return this.http.get<any>(url);
  
  }
}

