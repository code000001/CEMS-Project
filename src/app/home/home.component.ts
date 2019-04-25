import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AuthGuard } from '../_guards';
import { ActivatedRoute } from '@angular/router';
import { UserService, AuthenticationService } from '../_services';
import { OrganizationService } from '../services/organization.service';
import { StaffOrgDataInterface } from '../_models/organization-data-interface';

import { User, Role } from '../_models';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  currentUser: User;
  userFromApi: User;
  staffData: StaffOrgDataInterface;
  constructor(
    private titleService: Title,
    private route: ActivatedRoute,
     private router: Router,
     private userService: UserService,
     private authenticationService: AuthenticationService,
     private orgService: OrganizationService,
     private authGuardService: AuthGuard
  ) { this.userFromApi = this.currentUser = this.authenticationService.currentUserValue;}

  ngOnInit() {
    this.titleService.setTitle('หน้าแรก');
    console.log(localStorage.getItem('orgStaffCur'));
    console.log(localStorage.getItem('currentUser'));
  }

 
}
