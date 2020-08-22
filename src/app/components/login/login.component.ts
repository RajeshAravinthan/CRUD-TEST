import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { apiService } from '../../service/api.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  @ViewChild('logInFormData') loginData: NgForm;
  submit: boolean = false;
  sessionData;
  email: string;
  pwd: string;
  constructor(private router: Router, public api: apiService) {}

  ngOnInit(): void {}

  // check autheticate user

  autheticateUser = () => {
    var temp = [];
    var checkUser = [];
    this.submit = true;
    this.sessionData = JSON.parse(sessionStorage.getItem('register'));
    if (this.sessionData !== null) {
      this.sessionData.forEach((element) => {
        var tempdata = { email: element.email, pwd: element.pwd };
        temp.push(tempdata);
      });
      temp = temp.map((obj) => {
        if (this.loginData.value.email.toString() == obj.email.toString()) {
          checkUser.push({ email: obj.email, pwd: obj.pwd });
        }
      });
      console.log(checkUser);
      if (checkUser.length === 0) {
        Swal.fire('User Not Registered');
        return false;
      } else if (checkUser.length === 1) {
        if (checkUser[0].pwd === this.loginData.value.pwd) {
          this.router.navigate(['dashboard']);
          sessionStorage.setItem('login', 'true');
          this.api.loggedIn = true;
        } else {
          Swal.fire('Please Check Your Credentials');
        }
      }
    } else {
      Swal.fire('Invalid user');
    }
  };
}
