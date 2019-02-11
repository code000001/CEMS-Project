import { Component, OnInit } from '@angular/core';
import { ApiRestTestService } from '../../api-rest-test.service';

@Component({
  selector: 'app',
  templateUrl: './showannouncement.component.html'
})
export class ShowAnnouncementComponent implements OnInit {
  data: any = [];

  rows = [
    { name: 'Austin', gender: 'Male', company: 'Swimlane' },
    { name: 'Dany', gender: 'Male', company: 'KFC' },
    { name: 'Molly', gender: 'Female', company: 'Burger King' },
  ];
  columns = [
    { prop: 'name' },
    { name: 'Gender' },
    { name: 'Company' }
  ];

  constructor(public rest: ApiRestTestService) { }

  ngOnInit() {
    console.log(this.rows);
  }
}