import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = "https://reqres.in/api"; 

  constructor(private http: HttpClient) { }

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials);
  }

  register(userData: { name: string; age: number; email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, userData);  
  }
}


