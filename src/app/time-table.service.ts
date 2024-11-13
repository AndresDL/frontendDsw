import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TimeTableService {

  readonly baseUrl = 'http://localhost:4200/api/'
  
  constructor(private http: HttpClient){}
  
  getTimeTables(){
    
    const url = this.baseUrl + 'time_table';
    
    return this.http.get<any>(url);

  }

}