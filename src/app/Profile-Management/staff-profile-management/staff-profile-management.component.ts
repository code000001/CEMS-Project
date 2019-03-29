import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthGuard } from '../../_guards';
import { User, Role } from '../../_models';
import { UserService, AuthenticationService } from '../../_services';

@Component({
  selector: 'app-staff-profile-management',
  templateUrl: './staff-profile-management.component.html',
  styleUrls: ['./staff-profile-management.component.css']
})
export class StaffProfileManagementComponent implements OnInit {

  currentUser: User;
  userFromApi: User;
  constructor(private router: Router,
    private userService: UserService,
    private authenticationService: AuthenticationService,
    private authGuardService: AuthGuard) { this.userFromApi = this.currentUser = this.authenticationService.currentUserValue; }

  ngOnInit() {
  }

}
