import { Component, OnInit } from '@angular/core';
import { User, Role } from 'src/app/_models';
import { Router } from '@angular/router';
import { UserService, AuthenticationService } from 'src/app/_services';
import { AuthGuard } from 'src/app/_guards';

@Component({
  selector: 'app-stu-qualifying-status',
  templateUrl: './stu-qualifying-status.component.html',
  styleUrls: ['./stu-qualifying-status.component.css']
})
export class StuQualifyingStatusComponent implements OnInit {

  currentUser: User;
  userFromApi: User;
  testQualifyingStatus = [{id : 1,name:'ผ่าน', checked: false}, {id : 2,name:'ไม่ผ่าน', checked: true}];
  conferDes = [{id:1,name:'อบรม MFEC', detail:'อบรมๆๆ', hour: 3},{id:2,name:'อบรม NECTEC', detail:'อบรมๆๆ', hour: 3}];
  conferHead = [];
  constructor(  private router: Router,
    private userService: UserService,
    private authenticationService: AuthenticationService,
    private authGuardService: AuthGuard) {  
      this.userFromApi = this.currentUser = this.authenticationService.currentUserValue;
      this.conferHead = [{ th: 'รายละเอียดในการอบรม',en: 'Description'},
    { th: 'จำนวนชั่วโมง',en: 'Hour'}]
    }


  ngOnInit() {
  }
  get isSignin() {
    if (this.currentUser != null) {
      return true;
    }
    return false;
  }

  get isUser() {
    return this.currentUser && this.currentUser.accTypeId === Role.User;
  }

  get isStaff() {
    return this.currentUser && this.currentUser.accTypeId === Role.Staff;
  }

  get isAgent() {
    return this.currentUser && this.currentUser.accTypeId === Role.Agent;
  }

  get isAdmin() {
    return this.currentUser && this.currentUser.accTypeId === Role.Admin;
  }

  public get getTestQualifyingStatus(){
    return this.testQualifyingStatus;
  }

}
