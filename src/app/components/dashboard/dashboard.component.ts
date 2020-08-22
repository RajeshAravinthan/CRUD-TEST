import { Component, OnInit } from '@angular/core';
import { apiService } from '../../service/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  getData = [];
  userSession = [];

  constructor(private api: apiService, private router: Router) {}

  ngOnInit(): void {
    // Check user login or not
    if (sessionStorage.getItem('login') == 'true') {
      this.api.loggedIn = true;
    } else {
      this.api.loggedIn = false;
      this.router.navigate(['login']);
    }

    // Sample api get datas
    this.api.getUsers().subscribe(
      (response) => {
        if (response.status === 0) {
          console.log(response);
        } else {
          this.getData = response;
        }
      },
      (err) => {}
    );

    // Get User Datas
    this.userSession = JSON.parse(sessionStorage.getItem('register'));
  }
}
