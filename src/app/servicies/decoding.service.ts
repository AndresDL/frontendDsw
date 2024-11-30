import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class DecodingService {

  token!: string | null;
  decodedToken!: any;

  constructor(){}

  getDecodedAccessToken(token: string): any {
    try {
      return jwtDecode(token);
    } catch(Error) {
      return null;
    }
  }

  decodeToken()
  {
    this.token = localStorage.getItem('token');
    //Valido si la token es nula
    if(this.token){
      this.decodedToken = this.getDecodedAccessToken(this.token);
      return this.decodedToken; 
    };
    return null;
  }
}
