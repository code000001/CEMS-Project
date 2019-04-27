import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthGuard } from '../_guards';
import { User, Role, StaffOrgDataInterface } from '../_models';
import { UserService, AuthenticationService } from '../_services';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  private currentUserSubject: BehaviorSubject<StaffOrgDataInterface>;
  curStaff: Observable<StaffOrgDataInterface>;
  currentUser: User;
  userFromApi: User;
  yo: number = 0;

  constructor(
    private router: Router,
    private userService: UserService,
    private authenticationService: AuthenticationService,
    private authGuardService: AuthGuard
  ) {
    this.currentUserSubject = new BehaviorSubject<StaffOrgDataInterface>(JSON.parse(localStorage.getItem('orgStaffCur')));
    this.curStaff = this.currentUserSubject.asObservable();
    this.userFromApi = this.currentUser = this.authenticationService.currentUserValue;
  }

  ngOnInit() {
  }


  // check user
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

  logout() {
    this.authenticationService.logout();
    // const isAuth = this.authGuardService.canActivate;
    // const currentUser = this.authenticationService.currentUserValue;
    // if (currentUser.role == 'User') {
    //   const isHidden = false;
    // }else{
    //   const isHidden = true;
    // }
    window.location.reload();
    // this.router.navigate(['/login']);
  }

}
