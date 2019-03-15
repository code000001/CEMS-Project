import { Component, OnInit ,Input} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {OrganizationService} from '../../services/organization.service';
import {OrganizationDataInterface} from '../../_models/organization-data-interface';
import {PositionDataInterface} from '../../_models/position-data-interface';
import {AnouncementInterface} from '../../_models/announcement-interface';

@Component({
  selector: 'app-view-jod-detail-announcement',
  templateUrl: './view-announcement.component.html',
  styleUrls: ['./view-announcement.component.css']
})
export class ViewJodDetailAnnouncementComponent implements OnInit {

  id: number = null;
  orgStatusId: number = null;
  orgTypeId: number = null;
  org: OrganizationDataInterface;
  positionData : PositionDataInterface[];
  annData : AnouncementInterface[];
  
  constructor(private route: ActivatedRoute,private organizationService: OrganizationService) { }

  ngOnInit() {
    this.getOrgById();
  }

  getOrgById(){
   const id = +this.route.snapshot.paramMap.get('id');
     this.organizationService.getDetailById(id)
       .subscribe(org => {this.org = org
        console.log(this.org);
      });
  }
}
