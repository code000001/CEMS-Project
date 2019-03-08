import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthGuard } from '../../_guards';
import { User, Role } from '../../_models';
import { UserService, AuthenticationService } from '../../_services';

@Component({
  selector: 'app-add-jod-detail-announcement',
  templateUrl: './add-announcement.component.html',
  styleUrls: ['./add-announcement.component.css']
})
export class AddJodDetailAnnouncementComponent implements OnInit {
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
