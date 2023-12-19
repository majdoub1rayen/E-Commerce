import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/service/user.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  First_Name: string = '';
  Last_Name: string = '';
  PURE_EMAIL_REGEXP =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  password: string = '';
  RegisterForm: FormGroup;
  constructor(
    private UserService: UserService,
    private formBuilder: FormBuilder
  ) {
    this.RegisterForm = this.formBuilder.group({
      First_Name: new FormControl(
        '',
        Validators.compose([Validators.required])
      ),
      Last_Name: new FormControl('', Validators.compose([Validators.required])),
      email: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.email,
          Validators.pattern(this.PURE_EMAIL_REGEXP),
        ])
      ),
      password: new FormControl('', Validators.compose([Validators.required])),
    });
  }
  ngOnInit(): void {
    if (this.UserService.RegisterForm != undefined) {
      this.RegisterForm = this.UserService.RegisterForm;
    }
  }
  saveUser() {
    console.log(
      'Form values before FormData preparation:',
      this.RegisterForm.value
    );
    let user: User = {
      First_Name: this.RegisterForm.value.Nom,
      Last_Name: this.RegisterForm.value.Prenom,
      email: this.RegisterForm.value.email,
      password: this.RegisterForm.value.password,
    };

    this.UserService.saveUser(user).subscribe(
      (response) => {
        this.UserService.RegisterForm = undefined;
      },
      (error) => {
        console.error('Error adding user:', error);
      }
    );
    console.log('FormData before sending:', user);
  }
}
