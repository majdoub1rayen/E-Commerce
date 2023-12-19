import { Component, OnInit } from '@angular/core';
import { LoginService } from '../service/login.service';
import { UserService } from '../service/user.service';
import { User } from '../model/user';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  loggedInUser: User | null = null;

  constructor(
    private loginService: LoginService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.loginService.getDataObservable().subscribe(() => {
      const userId = localStorage.getItem('id');
      if (userId) {
        this.getUserDetails(userId);
      }
    });
  }

  getUserDetails(id: string) {
    this.userService.getUserById(id).subscribe((user: User) => {
      this.loggedInUser = user;
    });
  }
}
