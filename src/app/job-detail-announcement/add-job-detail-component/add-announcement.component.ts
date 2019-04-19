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


@Component({
  selector: 'app-add-job-detail-announcement',
  templateUrl: './add-announcement.component.html'
})
export class AddJobDetailAnnouncementComponent implements OnInit {
  currentUser: User;
  userFromApi: User;
  id: number = null;
  annStatusId: number = 1;
  annOrgId: number
  annAccId: number
  annStartDate: Date
  annEndDate: Date
  annStdAmount: number
  annReward: string
  annWorkshift: string
  annItemReq: string

  logkAnnId: number;
  logkAnnKrdId: number;

  logpAnnId: number;
  logpAnnPosId: number;

  _getAnouncement: AnouncementInterface[];
  _getLogKnowledge: LogKnowledgeInterface[];
  _getLogPosition: LogPositionInterface[];

  constructor(private router: Router,
    private userService: UserService,
    private authenticationService: AuthenticationService,
    private authGuardService: AuthGuard,
    private service: OrganizationService) { this.userFromApi = this.currentUser = this.authenticationService.currentUserValue; }

  ngOnInit() {
    $(document).ready(function () {
      $("#addpos").click(function () {
        $("#div_pos").after("<div class='form-group required row controls col-md-12'><label for='logpAnnPosId' class='control-label col-md-3 requiredField'></label><div class='controls col-md-4'>" +
          "<select class='form-control' id='logpAnnPosId'>" +
          "<option>Programer</option><option>Tester</option><option>Business Analyst</option><option>Web application</option>" +
          "</select>" + "</div></div>");
      });

      $("#addknow").click(function () {
        $("#div_know").after("<div class='form-group required row controls col-md-12'><label for='logkAnnKrdId' class='control-label col-md-3 requiredField'></label><div class='controls col-md-4'>" +
          "<select class='form-control' id='logkAnnKrdId'>" +
          "<option>HTML</option><option>CSS</option><option>PHP</option><option>Java Script</option>" +
          "</select>" + "</div></div>");
      });
    });
  }

  addAnouncement() {
    let announcement: AnouncementInterface = {
      id: this.id,
      annStatusId: this.annStatusId,
      annOrgId: this.annOrgId,
      annAccId: this.annAccId,
      annStartDate: this.annStartDate,
      annEndDate: this.annEndDate,
      annStdAmount: this.annStdAmount,
      annReward: this.annReward,
      annWorkshift: this.annWorkshift,
      annItemReq: this.annItemReq
    };

    let annLogKnowledge: LogKnowledgeInterface = {
      id: this.id,
      logkAnnId: this.logkAnnId,
      logkAnnKrdId: this.logkAnnKrdId
    };
    
    let annLogPosition: LogPositionInterface = {
      id: this.id,
      logpAnnId: this.logpAnnId,
      logpAnnPosId: this.logpAnnPosId
    };


    this.service.postAnnouncement(announcement)
      .subscribe((m) => {
        console.log(announcement);
        this._getAnouncement.push(announcement);
      })
    
    this.service.postLogKnowlegdeById(annLogKnowledge)
      .subscribe((m) => {
        console.log(annLogKnowledge);
        this._getLogKnowledge.push(annLogKnowledge);
      })

    this.service.postLogPositionById(annLogPosition)
      .subscribe((m) => {
        console.log(annLogPosition);
        this._getLogPosition.push(annLogPosition);
      })
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
