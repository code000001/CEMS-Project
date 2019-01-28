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
  constructor(public loginService: ApiRestLoginService) { }

  ngOnInit() {
  }

  onLoginBtn(acc_login, acc_pass){
    const httpBody = 'acc_login='+acc_login;
    const httpHeaders = new HttpHeaders();
    httpHeaders.append('Authorization','Basic ' + btoa(acc_login)+btoa(acc_pass))
    httpHeaders.append('Content-Type',  'application/json')

    console.log(acc_login+'  '+acc_pass);
  this.getLoginData(httpHeaders, httpBody);
  }
  getLoginData(httpHeaders, httpBody) {
    this.loginData = [];
    this.loginService.getLoginData(httpHeaders,httpBody).subscribe((data: {}) => {
      console.log(data);
      this.loginData = data;
    });
  }
}
