// role : student only
// ใบลงทะเบียน INS-002 กรอกข้อมูลของนิสิต/นักศึกษา
// modify by : Waranya boontanom

import { Component, OnInit } from '@angular/core';

import { HttpClient,HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { AuthenticationService } from '../../_services';
import { AppFormService } from '../../Services/app-form.service';
import { Userappform } from '../../_models/userappform';

@Component({
  selector: 'app-student-org-app-form',
  templateUrl: './student-org-app-form.component.html',
  styleUrls: ['./student-org-app-form.component.css']
})
export class StudentOrgAppFormComponent implements OnInit {
  dataU : Userappform;
  items = [];
  selectedSimpleItem = 'Two';
  data: any = [];

  constructor(
    private appFormService : AppFormService,
    private authenticationService: AuthenticationService,
    private http: HttpClient
    ) { 

    }

    

  ngOnInit() {
  }

}
