import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, catchError, tap } from 'rxjs';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private dataSubject = new Subject<void>();

  constructor(private http: HttpClient, private router: Router) {}

  login(user: User) {
    return this.http.post<any>('http://localhost:3000/login', user).pipe(
      tap((response) => {
        localStorage.setItem('token', response.token);
        localStorage.setItem('email', user.email);
        this.router.navigate(['/dashboard']);
        this.triggerGetData();
      }),
      catchError((error) => {
        console.error('Login error:', error);
        throw error; // Re-throw the error to be handled in the component
      })
    );
  }

  triggerGetData() {
    this.dataSubject.next();
  }

  getDataObservable() {
    return this.dataSubject.asObservable();
  }
}
