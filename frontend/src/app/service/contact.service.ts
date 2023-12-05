import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Contact } from 'src/app/model/contact';
@Injectable({
  providedIn: 'root',
})
export class ContactServise {
  ContactForm: FormGroup | undefined = undefined;
  constructor(private http: HttpClient) {}
  private apiUrl = 'http://localhost:3000';

  saveContact(contact: Contact) {
    return this.http.post(this.apiUrl + '/contact', contact);
  }
}
