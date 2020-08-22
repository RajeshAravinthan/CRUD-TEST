import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  @ViewChild('RegistrationFormData') RegistrationData: NgForm;

  submit: boolean = false;
  passError: boolean = false;
  totalset: any;
  constructor(private router: Router) {}
  ngOnInit(): void {}

  // user register metho
  RegisterUser() {
    this.submit = true;
    if (this.RegistrationData.valid) {
      if (
        this.RegistrationData.value.pwd !== this.RegistrationData.value.confpwd
      ) {
        this.passError = true;
        return false;
      }
      var totaldataset;
      if (
        JSON.parse(sessionStorage.getItem('register')) === null ||
        JSON.parse(sessionStorage.getItem('register')) === undefined
      ) {
        totaldataset = [];
      } else {
        totaldataset = JSON.parse(sessionStorage.getItem('register'));
      }

      totaldataset.push(this.RegistrationData.value);
      sessionStorage.setItem('register', JSON.stringify(totaldataset));
      this.router.navigate(['']);
    } else {
    }
  }
}
