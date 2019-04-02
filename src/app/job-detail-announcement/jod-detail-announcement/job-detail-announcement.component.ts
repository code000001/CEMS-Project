import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthGuard } from '../../_guards';
import { User, Role } from '../../_models';
import { UserService, AuthenticationService } from '../../_services';
import {OrganizationService} from '../../services/organization.service';
import {OrganizationDataInterface} from '../../_models/organization-data-interface';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-job-detail-announcement',
  templateUrl: './job-detail-announcement.component.html',
  styleUrls: ['./job-detail-announcement.component.css']
})
export class JobDetailAnnouncementComponent implements OnInit {
  id: number
  currentUser: User;
  userFromApi: User;
  orgData: OrganizationDataInterface[];

  constructor(private router: Router,
    private organizationService: OrganizationService) { 
     
    }

  ngOnInit() {
    this.getOrganization();
    if(localStorage.getItem('currentUser') != null){0
      this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }
  }

  getOrganization(): void {
     this.organizationService.get()
       .subscribe(
         resultData => { this.orgData = resultData; },
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
