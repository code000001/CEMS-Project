import { Component, OnInit } from '@angular/core';
import { ApiRestTestService } from '../api-rest-test.service';
import { ApiRestLoginService } from './../services/api-rest-login.service';
import { HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-announcement',
  templateUrl: './announcement.component.html',
  styleUrls: ['./announcement.component.css']
})
export class AnnouncementComponent implements OnInit {
  data: any = [];
  header: HttpHeaders;
  constructor(public rest: ApiRestTestService, private userData: ApiRestLoginService) { }

  ngOnInit() {
    const httpHeaders = new HttpHeaders({
      'Authorization': 'Basic ' + localStorage.getItem('token'),
      'Content-Type': 'application/x-www-form-urlencoded'
    });
    this.header = httpHeaders;
    this.getTestData();
  }
  onLogoutBtn() {
    localStorage.clear();
  }

  getTestData() {
    this.data = [];
    this.rest.getTestData(this.header).subscribe((data: {}) => {
      console.log(data);
      this.data = data;
    });
  }

}
