import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../enviroments/environment';
import { map, Observable } from 'rxjs';

//Interface
import { User } from '../interfaces/user';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint
    this.myApiUrl = environment.endpointuser
  }

  //Getall
  getUsers(): Observable<User[]>{
    const url = `${this.myAppUrl}${this.myApiUrl}`;
    return this.http.get<any>(url).pipe(map(response => {
      return response.data;
    }));
  }
  
  //Createuser
  signIn(user: User, captcha: string): Observable<any>{
    const url = `${this.myAppUrl}${this.myApiUrl}`
    console.log(url)
    return this.http.post(url, {user, captcha});
  }

  //Getuser
  login(user: User, captcha: string) {
    const url = `${this.myAppUrl}${this.myApiUrl}/login`;
    return this.http.post<{token: string}>(url, {user, captcha});
  }
}
