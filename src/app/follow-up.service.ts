import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FollowUpService {

  readonly baseUrl = 'http://localhost:4200/api'
  
  constructor (private http: HttpClient) {}
  
  getFollowUps () {
    
    const url = this.baseUrl + 'follow_up'
    
    return this.http.get<any>(url);
  }

}
