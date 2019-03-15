// role : student only
// ใบลงทะเบียน INS-002 กรอกข้อมูลของนิสิต/นักศึกษา
// modify by : Waranya boontanom

import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

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
  
  // rows = [];
  // Address 1
  Provinces: any;
  selectedProvinces = null;
  Amphures: any;
  selectedAmphures = null;
  Districts: any;
  selectedDistricts = null;
  Zipcode:number  = null;
  // Address 2
  A2Provinces: any;
  A2selectedProvinces = null;
  A2Amphures: any;
  A2selectedAmphures = null;
  A2Districts: any;
  A2selectedDistricts = null;
  A2Zipcode:number  = null;

  userData: any ;
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
    this.loadingProvinces();
  }

  public get countLevel() {
    return this.LANGUAGElevel.length;
  }

  public get countskill() {
    return this.LANGUAGEskill.length;
  }

  ngOnInit() {
    this.loadingData();
    // this.loadingProvinces();
    // if(this.Provinces[0].id){ this.selectedProvinces = this.Provinces[0].id }
    // if(this.selectedProvinces){ console.log(this.selectedProvinces);this.showAmphures(); }
  }

  loadingData() {
    this.appFormService.getINS02().subscribe((data: {}) => {
      // console.log(data);
      this.userData = data;
    });
  }

  loadingProvinces() {
    this.appFormService.getProvince().subscribe((data: {}) => {
      this.A2Provinces = this.Provinces = data;
    });
  }

  loadingAmphures(adr : number, pv : number) {
    this.appFormService.getAmphure(pv).subscribe((data: {}) => {
      if(adr === 1){ this.Amphures = data }else{ this.A2Amphures = data}
    });
  }

  loadingDistricts(adr : number, amp : number) {
    this.appFormService.getDistrict(amp).subscribe((data: {}) => {
      if(adr === 1){ this.Districts = data }else{ this.A2Districts = data}
    });
  }

  enableAddressOther(event){
    this.FDAddressOther = false;
    if(event === 0){
      this.FDAddressOther = true;
    }
    
  }

  public get getFDAddressOther(){
    return this.FDAddressOther;
  }

  showAmphures(adr : number = 0, $event){
    this.loadingAmphures(adr,$event.id);
  }

  showDistricts(adr : number = 0, $event){
    this.loadingDistricts(adr,$event.id);
  }

  showZipcode(adr : number = 0, $event){
    if($event.zipcode === 0){
      return ;
    }
    if(adr === 1){ this.Zipcode = $event.zipcode }else{ this.A2Zipcode = $event.zipcode }
  }

  public get getZipcode(){
    return this.Zipcode;
  }
  
  public get getA2Zipcode(){
    return this.A2Zipcode;
  }

}
