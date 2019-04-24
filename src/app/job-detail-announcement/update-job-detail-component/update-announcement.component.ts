import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthGuard } from '../../_guards';
import { User, Role } from '../../_models';
import { UserService, AuthenticationService } from '../../_services';
import { OrganizationService } from '../../services/organization.service';
import { AnouncementInterface, } from '../../_models/announcement-interface';
import { LogKnowledgeInterface } from '../../_models/log-knowledge-req-interface';
import { LogPositionInterface } from '../../_models/log-position-interface';
declare var $: any;
import {FormControl} from '@angular/forms';
import {MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material';
import * as moment from 'moment';
export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'YYYY-MM-DD',
    monthYearLabel: 'YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'YYYY',
  },
};

@Component({
  selector: 'app-update-job-detail-announcement',
  templateUrl: './update-announcement.component.html',
  styleUrls: ['./update-announcement.component.css'],
  providers: [
    // `MomentDateAdapter` can be automatically provided by importing `MomentDateModule` in your
    // application's root module. We provide it at the component level here, due to limitations of
    // our example generation script.
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ]
})
export class UpdateJobDetailAnnouncementComponent implements OnInit {

  currentUser: User;
  userFromApi: User;
  id: number = null;
  annStatusId: number = null;
  annOrgId: number = 3
  annAccId: number = 1
 
  annStdAmount: number
  annReward: string
  annWorkshift: string
  annItemReq: string
  date ={
    annStartDate: new Date(),
    annEndDate: new Date()
  }

  logkAnnId: number =3;
  logkAnnKrdId: number;

  logpAnnId: number =3;
  logpAnnPosId: number;

  _getAnouncement: AnouncementInterface[];
  _getLogKnowledge: LogKnowledgeInterface[];
  _getLogPosition: LogPositionInterface[];
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
