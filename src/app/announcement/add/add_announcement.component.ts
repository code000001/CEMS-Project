import { Component, OnInit } from '@angular/core';
import { ApiRestTestService } from '../../api-rest-test.service';

@Component({
  selector: 'app-add',
  templateUrl: './add_announcement.component.html'
})
export class AddAnnouncementComponent implements OnInit {

  constructor(public rest: ApiRestTestService) { }

  ngOnInit() {
    
  }
}