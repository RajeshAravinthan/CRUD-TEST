import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { apiService } from './service/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'CRUD-TEST-GODB';
  loggedUser: boolean;
  constructor(private router: Router, public api: apiService) {}
  ngOnInit(): void {}

  logout = () => {
    sessionStorage.removeItem('login');
  };
}
