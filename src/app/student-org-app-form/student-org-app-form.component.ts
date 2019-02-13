// role : student only
// ใบลงทะเบียน INS-002 กรอกข้อมูลของนิสิต/นักศึกษา
// modify by : Waranya boontanom

import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-student-org-app-form',
  templateUrl: './student-org-app-form.component.html',
  styleUrls: ['./student-org-app-form.component.css']
})
export class StudentOrgAppFormComponent implements OnInit {

  items = [];
  selectedSimpleItem = 'Two';

  constructor(private titleService: Title) { }

  ngOnInit() {
    this.titleService.setTitle(this.titleService.getTitle());
    this.items = [true, 'Two', 3];
  }

}
