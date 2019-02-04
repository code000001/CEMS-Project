import { Component, OnInit } from '@angular/core';
import { ApiRestTestService } from '../../api-rest-test.service';

@Component({
  selector: 'app-showannouncement',
  templateUrl: './showannouncement.component.html'
})
export class ShowAnnouncementComponent implements OnInit {
  data: any = [];

  constructor(public rest: ApiRestTestService) { }

  ngOnInit() {
  }
}