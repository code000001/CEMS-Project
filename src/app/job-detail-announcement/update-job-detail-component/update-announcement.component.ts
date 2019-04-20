import { Component, OnInit } from '@angular/core';
import { AuthGuard } from '../../_guards';
import { Router } from '@angular/router';
import { User, Role } from '../../_models';
import { UserService, AuthenticationService } from '../../_services';

@Component({
  selector: 'app-update-job-detail-announcement',
  templateUrl: './update-announcement.component.html',
  styleUrls: ['./update-announcement.component.css']
})
export class UpdateJobDetailAnnouncementComponent implements OnInit {

  currentUser: User;
  userFromApi: User;
  constructor(private authenticationService: AuthenticationService) { this.userFromApi = this.currentUser = this.authenticationService.currentUserValue; }

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
