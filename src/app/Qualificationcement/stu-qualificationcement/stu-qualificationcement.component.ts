import { Component, OnInit } from '@angular/core';
import { User, Role } from 'src/app/_models';
import { Router } from '@angular/router';
import { UserService, AuthenticationService } from 'src/app/_services';
import { AuthGuard } from 'src/app/_guards';

@Component({
  selector: 'app-stu-qualificationcement',
  templateUrl: './stu-qualificationcement.component.html',
  styleUrls: ['./stu-qualificationcement.component.css']
})
export class StuQualificationcementComponent implements OnInit {

  currentUser: User;
  userFromApi: User;
  constructor(  private router: Router,
    private userService: UserService,
    private authenticationService: AuthenticationService,
    private authGuardService: AuthGuard) {  this.userFromApi = this.currentUser = this.authenticationService.currentUserValue;}


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
}
