import { Component, OnInit } from '@angular/core';
import { ApiRestLoginService } from '../api-rest-login.service';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-loginscreen',
  templateUrl: './loginscreen.component.html',
  styleUrls: ['./loginscreen.component.css']
})
export class LoginscreenComponent implements OnInit {
  loginData: any = [];
  acc_login = '';
  acc_pass = '';
  constructor(public loginService: ApiRestLoginService) { }

  ngOnInit() {
  }

  updateAccLoginValue(event: KeyboardEvent) {
    this.acc_login = (<HTMLInputElement>event.target).value;
  }
  updateAccPassValue(event: KeyboardEvent) {
    this.acc_pass = (<HTMLInputElement>event.target).value;
  }

  onLoginBtn() {
    const httpBody = 'acc_login=' + this.acc_login;
    const httpHeaders = new HttpHeaders({
      'Authorization': 'Basic ' + btoa(this.acc_login + ':' + this.acc_pass),
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    console.log(httpHeaders);
    this.getLoginData(httpHeaders, httpBody);
  }
  getLoginData(httpHeaders, httpBody) {
    this.loginData = [];
    this.loginService.getLoginData(httpHeaders, httpBody).subscribe((data: {}) => {
      console.log(data);
      this.loginData = data;
    });
  }
}
