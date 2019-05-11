import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthGuard } from '../../_guards';
import { UserService, AuthenticationService } from '../../_services';
import { User, Role } from '../../_models';
import { ActivatedRoute } from '@angular/router';
import { OrganizationService } from '../../services/organization.service';
import { OrganizationDataInterface } from '../../_models/organization-data-interface';
import { PositionDataInterface } from '../../_models/position-data-interface';
import { AnouncementInterface } from '../../_models/announcement-interface';
import { KnowledgeRequirementInterface } from '../../_models/knowledge-requirement-interface';
import { LogKnowledgeInterface } from '../../_models/log-knowledge-req-interface';
import {LogPositionInterface} from '../../_models/log-position-interface';

@Component({
  selector: 'app-view-job-detail-announcement',
  templateUrl: './view-announcement.component.html',
  styleUrls: ['./view-announcement.component.css']
})
export class ViewJobDetailAnnouncementComponent implements OnInit {

  currentUser: User;
  userFromApi: User;
  org: OrganizationDataInterface
  logPosition : LogPositionInterface
 
  annData: AnouncementInterface [] = []
  logReqKnow: LogKnowledgeInterface
  KnowledgeReq: KnowledgeRequirementInterface
  ListKnowlegde: KnowledgeRequirementInterface [] = []
  positionData: PositionDataInterface
  ListPosition: PositionDataInterface[] = []


  constructor(private route: ActivatedRoute, private organizationService: OrganizationService,
     private router: Router,
     private userService: UserService,
     private authenticationService: AuthenticationService,
     private authGuardService: AuthGuard) { this.userFromApi = this.currentUser = this.authenticationService.currentUserValue;}

  ngOnInit() {
    this.getOrgById()
    this.getAnnOrgById()
    this.getlogReqKnowId()
    this.getlogPositionId()
  }

  getOrgById() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.organizationService.getDetailById(id)
      .subscribe(org => {
      this.org = org
        //console.log(this.org)
      });
  }

  getAnnOrgById() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.organizationService.getAnnByorgId(id)
      .subscribe(annData => {
      this.annData = annData
        console.log(this.annData)
      });
  }

 

  getlogPositionId() {
    const id = +this.route.snapshot.paramMap.get('id');

    this.organizationService.getLogPositionBylogpAnnId(id)
      .subscribe(logPosition => {
      this.logPosition = logPosition
        console.log(this.logPosition)
        //this.getKnowledgeReq(this.logReqKnow.logkAnnKrdId)

        for (let index = 0; index < 10; index++) {
          if (this.logPosition[index] != undefined) {
            this.getPosition(this.logPosition[index].logpAnnPosId);
          }
          else {
            break;
          }
        }
      }
      );

  }

  getPosition(id: number) {
    // console.log(id)
    this.organizationService.getPositionById(id)
      .subscribe(positionData => {
      this.positionData = positionData
        this.ListPosition.push(this.positionData);
        console.log(this.ListPosition)
      });
  }

  getKnowledgeReq(id: number) {
    // console.log(id)
    this.organizationService.getKnowledgeReqById(id)
      .subscribe(KnowledgeReq => {
      this.KnowledgeReq = KnowledgeReq
        this.ListKnowlegde.push(this.KnowledgeReq);
       // console.log(this.ListKnowlegde)
      });
  }

  getlogReqKnowId() {
    const id = +this.route.snapshot.paramMap.get('id');

    this.organizationService.getLogKnowledgeBylogkAnnId(id)
      .subscribe(logReqKnow => {
      this.logReqKnow = logReqKnow
        // console.log(this.logReqKnow)
        //this.getKnowledgeReq(this.logReqKnow.logkAnnKrdId)

        for (let index = 0; index < 10; index++) {
          if (this.logReqKnow[index] != undefined) {
            this.getKnowledgeReq(this.logReqKnow[index].logkAnnKrdId);
          }
          else {
            break;
          }
        }
      }
      );

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

  appfrom(){
    this.router.navigate(['/app-form/'+this.org[0].id+'/'+this.route.snapshot.paramMap.get('id')]);
  }

  get isRegister() {
    if(this.org[0].orgStatusId == 1){
      return true;
    }
    return false;
  }

}

