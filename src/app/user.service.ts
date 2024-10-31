import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from './enviroments/environment';
import { Observable } from 'rxjs';

//Interface
import { User } from './interfaces/user';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private myAppUrl: string;
  private myApiUrl= "api/users/"

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint
  }

  signIn(user: User): Observable<any>{
    return this.http.post(`${this.myAppUrl}${this.myApiUrl}`, user);
  }
}
