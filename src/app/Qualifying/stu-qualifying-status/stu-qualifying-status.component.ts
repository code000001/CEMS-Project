import { Component, OnInit } from '@angular/core';
import { User, Role } from 'src/app/_models';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService, AuthenticationService } from 'src/app/_services';
import { AuthGuard } from 'src/app/_guards';
import { FormGroup, FormBuilder } from '@angular/forms';
import { StudentdataInterface } from 'src/app/_models/stu-data-interface';
import { StudentDataService } from 'src/app/services/std-ins-form.service';

@Component({
  selector: 'app-stu-qualifying-status',
  templateUrl: './stu-qualifying-status.component.html',
  styleUrls: ['./stu-qualifying-status.component.css']
})
export class StuQualifyingStatusComponent implements OnInit {
  StdForm: FormGroup;
  currentUser: User;
  userFromApi: User;
  add_std: StudentdataInterface;
  submitted = false;
  message: string = "ยังไม่ได้ลงสมัครคัดเลือกเป็นนิสิตสหกิจศึกษา";
  pass_test: Boolean = false;
  not_pass_test: Boolean = true;
  constructor(  private router: Router,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private studentdataService: StudentDataService,
    private userService: UserService,
    private authenticationService: AuthenticationService,
    private authGuardService: AuthGuard) {  
      this.userFromApi = this.currentUser = this.authenticationService.currentUserValue;
    }


  ngOnInit() {

      this.getstudentdata(this.userFromApi.userId);
  
      this.StdForm = this.fb.group({
        stdId: null,
        stdYear: null,
        stdCredit: null,
        stdGpax: null,
        stdCourse: null,
        stdBranch: null,
        stdAddressPartic: null,
        stdAddressNow: null,
        stdTel: null,
        stdMobile: null,
        stdEmail: null,
        stdpareFname: null,
        stdpareLname: null,
        stdpareRelation: null,
        stdpareAddress: null,
        stdpareMobile: null,
        stdpareTel: null,
        stdpareEmail: null,
        stdLastnameTh: null,
        stdLastnameEn: null,
        stdPrefixEn: null,
        stdPrefixTh: null,
        stdFirstnameEn: null,
        stdFirstnameTh: null,
        stdStatusId: null,
        stdTestScore: null,
        std_hr_prepare: null,
        std_hr_conference: null
      });
      
    }
  
    getstudentdata(stdId: number){
    this.studentdataService.getstddataBystdId(stdId).subscribe((data) =>{ 
      this.add_std = data; 
      console.log("data : ", data); 
      console.log("std : ", this.add_std);
    }    );
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

}
