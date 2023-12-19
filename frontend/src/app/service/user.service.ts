import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/model/user';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  RegisterForm: FormGroup | undefined = undefined;
  constructor(private http: HttpClient) {}

  private apiUrl = 'http://localhost:3000';

  saveUser(user: User) {
    return this.http.post(`${this.apiUrl}/user`, user);
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/user`);
  }

  getUserById(id: any): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/user/getbyid/${id}`);
  }
  // New method for user login
  loginUser(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials);
  }
}
