import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Contact } from 'src/app/model/contact';
import { ContactServise } from 'src/app/service/contact.service';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent implements OnInit, OnDestroy {
  message: string = '';
  name: string = '';
  PURE_EMAIL_REGEXP =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  subject: string = '';
  ContactForm: FormGroup;
  constructor(
    private ContactService: ContactServise,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar
  ) {
    this.ContactForm = this.formBuilder.group({
      message: new FormControl('', Validators.compose([Validators.required])),
      name: new FormControl('', Validators.compose([Validators.required])),
      email: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.email,
          Validators.pattern(this.PURE_EMAIL_REGEXP),
        ])
      ),
      subject: new FormControl('', Validators.compose([Validators.required])),
    });
  }
  ngOnDestroy(): void {
    this.ContactService.ContactForm = this.ContactForm;
  }
  ngOnInit(): void {
    if (this.ContactService.ContactForm != undefined) {
      this.ContactForm = this.ContactService.ContactForm;
    }
  }
  saveContact() {
    console.log(
      'Form values before FormData preparation:',
      this.ContactForm.value
    );

    let contact: Contact = {
      message: this.ContactForm.value.message,
      name: this.ContactForm.value.name,
      email: this.ContactForm.value.email,
      subject: this.ContactForm.value.subject,
    };

    this.ContactService.saveContact(contact).subscribe(
      (response) => {
        // Reset the form upon successful submission
        this.ContactForm.reset();

        // Clear ContactService.ContactForm (if needed)
        this.ContactService.ContactForm = undefined;

        // Show a snackbar notification to the user
        this.snackBar.open('Message sent successfully!', 'Close', {
          duration: 3000, // Duration the snackbar is displayed (in milliseconds)
        });
      },
      (error) => {
        console.error('Error adding message:', error);
      }
    );

    console.log('FormData before sending:', contact);
  }
}
