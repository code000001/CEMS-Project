// role : student only
// ใบลงทะเบียน INS-002 กรอกข้อมูลของนิสิต/นักศึกษา
// modify by : Waranya boontanom

import { Component, OnInit } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
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
  userData: Userappform;
  FDAddress = [{id : 1,name:'ที่อยู่ตามทะเบียนบ้าน'}, {id : 2,name:'ที่อยู่ที่ติดต่อได้'}, {id : 0,name:'อื่น ๆ'}];
  FDAddressOther : boolean = false;
  selectedSimpleItem = 'Two';
  LANGUAGE = [{th:'อังกฤษ',en:'English'},{th:'จีน',en:'Chinese'}];
  LANGUAGEskill = [];
  // LANGUAGEskill = ['ฟัง (Listening)','พูด (Speaking)','อ่าน (Reading)','เขียน (Writing)'];
  LANGUAGElevel = [{id : 1,name:'น้อย (low)'}, {id : 2,name:'ปานกลาง (medium)'}, {id : 3,name:'มาก (high)'}];

  constructor(
    private appFormService: AppFormService,
    private authenticationService: AuthenticationService,
    private http: HttpClient
  ) {
    this.LANGUAGEskill = [{ th: 'ฟัง',en: 'Listening', children: this.countLevel },
    { th: 'พูด',en: 'Speaking', children: this.countLevel },
    { th: 'อ่าน',en: 'Reading', children: this.countLevel },
    { th: 'เขียน',en: 'Writing', children: this.countLevel }]
  }

  public get countLevel() {
    return this.LANGUAGElevel.length;
  }

  public get countskill() {
    return this.LANGUAGEskill.length;
  }

  ngOnInit() {
    this.loadingData();
  }

  loadingData() {
    this.appFormService.getINS02().subscribe({
      next(response) { console.log('response -> ', this.userData = response); },
      error(err) { console.log(err); }
    });
  }

  enableAddressOther(event : number){
    this.FDAddressOther = false;
    if(event === 0){
      this.FDAddressOther = true;
    }
  }

  public get getFDAddressOther(){
    return this.FDAddressOther;
  }

}
