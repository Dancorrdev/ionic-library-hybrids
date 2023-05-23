import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'URL_DEL_BACKEND'; // Reemplaza con la URL de tu backend

  constructor(private http: HttpClient) {}

  getUserData(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/user`);
  }

  updateUser(userData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/user`, userData);
  }

  deleteUser(): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/user`);
  }
}

