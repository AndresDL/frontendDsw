import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TreatmentPriceService {
  readonly baseUrl = 'http://localhost:4200/api'
  
  constructor (private http: HttpClient) {}
  
  getTreatmentsPriceServices () {
  
    const url = this.baseUrl + 'treatment_price'
  
    return this.http.get<any>(url);
  }
}

