import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from './enviroments/environment';
import { map, Observable } from 'rxjs';

//Interface
import { User } from './interfaces/user';


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
  signIn(user: User): Observable<any>{
    return this.http.post(`${this.myAppUrl}${this.myApiUrl}`, user);
  }

  //Getuser
  login(user: User) {
    const url = `${this.myAppUrl}${this.myApiUrl}/login`;
    return this.http.post<{token: string}>(url, user);
  }
}
