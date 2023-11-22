import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  registrationData: { email: string; password: string } = {
    email: '',
    password: '',
  };

  constructor() {}
}
