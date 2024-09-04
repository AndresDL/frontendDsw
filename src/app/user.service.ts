import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  readonly baseUrl = 'http://localhost:4200/api/'
  
  constructor(private http: HttpClient){}
 
  getUsers(){
    
    const url = this.baseUrl + 'user';
    
    return this.http.get<any>(url);

  }


}
