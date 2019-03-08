import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthGuard } from '../../_guards';
import { User, Role } from '../../_models';
import { UserService, AuthenticationService } from '../../_services';
import {OrganizationService} from '../../_services/organization.service';
import {OrganizationDataInterface} from '../../interfaces/organization/organization-data-interface';
@Component({
  selector: 'app-jod-detail-announcement',
  templateUrl: './jod-detail-announcement.component.html',
  styleUrls: ['./jod-detail-announcement.component.css']
})
export class JodDetailAnnouncementComponent implements OnInit {
  id: number
  currentUser: User;
  userFromApi: User;
  orgData: OrganizationDataInterface[];

  constructor(private router: Router,
    private organizationService: OrganizationService) { }

  ngOnInit() {
    this.getOrganization();
  }

  getOrganization(): void {
     this.organizationService.get()
       .subscribe(
         resultData => { this.orgData = resultData; console.log(this.orgData) },
      )
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
