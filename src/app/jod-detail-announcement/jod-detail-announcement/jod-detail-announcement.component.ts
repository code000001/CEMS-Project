import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-jod-detail-announcement',
  templateUrl: './jod-detail-announcement.component.html',
  styleUrls: ['./jod-detail-announcement.component.css']
})
export class JodDetailAnnouncementComponent implements OnInit {

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
  constructor() { }

  ngOnInit() {
  }

}
