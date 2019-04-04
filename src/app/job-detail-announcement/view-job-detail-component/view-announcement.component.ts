import { Component, OnInit, Input } from '@angular/core';
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

  org: OrganizationDataInterface
  logPosition : LogPositionInterface
 
  annData: AnouncementInterface [] = []
  logReqKnow: LogKnowledgeInterface
  KnowledgeReq: KnowledgeRequirementInterface
  ListKnowlegde: KnowledgeRequirementInterface [] = []
  positionData: PositionDataInterface
  ListPosition: PositionDataInterface[] = []


  constructor(private route: ActivatedRoute, private organizationService: OrganizationService) { }

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
        // console.log(this.annData)
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
}

