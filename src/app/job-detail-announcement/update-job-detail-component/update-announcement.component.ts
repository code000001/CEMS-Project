import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthGuard } from '../../_guards';
import { User, Role, OrganizationDataInterface } from '../../_models';
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
import Swal from 'sweetalert2';
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
  org: OrganizationDataInterface[]

  id: number = null;
  annStatusId: number = 1;
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
  constructor(private authenticationService: AuthenticationService,private service : OrganizationService,private router: Router) { this.userFromApi = this.currentUser = this.authenticationService.currentUserValue; }

  ngOnInit() {
    this.getOrg();
    $(function () {
      $('[data-toggle="tooltip"]').tooltip()
    })
    $(document).ready(function () {
      $("#addpos").click(function () {
        $("#div_pos").after("<div class='form-group required row controls col-md-6'><label for='logpAnnPosId' class='col-md-6 col-form-label text-lg-right no-padding-right'></label><div class='controls col-md-5'>" +
          "<select class='form-control' id='logpAnnPosId'>" +
          "<option>Programer</option><option>Tester</option><option>Business Analyst</option><option>Web application</option>" +
          "</select>" + "</div></div>");
      });

      $("#addknow").click(function () {
        $("#div_know").after("<div class='form-group required row controls col-md-6'><label for='logkAnnKrdId' class='col-md-6 col-form-label text-lg-right no-padding-right'></label><div class='controls col-md-5'>" +
          "<select class='form-control' id='logkAnnKrdId'>" +
          "<option>HTML</option><option>CSS</option><option>PHP</option><option>Java Script</option>" +
          "</select>" + "</div></div>");
      });
    });
  }

  getOrg() {
    this.service.get()
      .subscribe(org => {
      this.org = org
      console.log(this.org)
      });
  }

  updateAnouncement(){
    let announcement: AnouncementInterface = {
      id: this.id,
      annStatusId: this.annStatusId,
      annOrgId: this.annOrgId,
      annAccId: this.annAccId,
      annStartDate: moment(this.date.annStartDate).format("YYYY/MM/DD"),
      annEndDate:  moment(this.date.annEndDate).format("YYYY/MM/DD"),
      annStdAmount: this.annStdAmount,
      annReward: this.annReward,
      annWorkshift: this.annWorkshift,
      annItemReq: this.annItemReq
    };

    this.service.putAnnouncement(announcement)
    .subscribe((m) => {
      console.log(announcement);
    },(err)=>{
      Swal.fire({
        type: 'warning',
        title: 'ไม่สามารถบันทึกข้อมูลได้',
        showConfirmButton: false,
        timer: 1500
      })     
    },()=>{
      this.router.navigate([`/view_announcement/${this.annOrgId}`]);
        Swal.fire({
              type: 'success',
              title: 'บันทึกข้อมูลสำเร็จ',
              showConfirmButton: false,
              timer: 1500
            })     
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
