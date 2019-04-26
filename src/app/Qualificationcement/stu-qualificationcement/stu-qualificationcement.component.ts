import { Component, OnInit } from '@angular/core';
import { User, Role } from 'src/app/_models';
import { Router } from '@angular/router';
import { UserService, AuthenticationService } from 'src/app/_services';
import { AuthGuard } from 'src/app/_guards';
import { StudentDataService } from 'src/app/services/std-ins-form.service';
import { StudentdataInterface } from 'src/app/_models/stu-data-interface';

@Component({
  selector: 'app-stu-qualificationcement',
  templateUrl: './stu-qualificationcement.component.html',
  styleUrls: ['./stu-qualificationcement.component.css']
})
export class StuQualificationcementComponent implements OnInit {
  id: number
  currentUser: User;
  userFromApi: User;
  stdData: StudentdataInterface[];

  constructor(  private router: Router,
    private userService: UserService,
    private studentdataService: StudentDataService,
    private authenticationService: AuthenticationService,
    private authGuardService: AuthGuard) {  this.userFromApi = this.currentUser = this.authenticationService.currentUserValue;}


    ngOnInit() {
      this.getOrganization();
      if(localStorage.getItem('currentUser') != null){
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
      }
    }
  
    getOrganization(): void {
       this.studentdataService.getStudentDataQualification()
         .subscribe(
           resultData => { this.stdData = resultData; },
        )
        console.log(this.stdData);
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
