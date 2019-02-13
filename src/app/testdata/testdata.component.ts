import { Component, OnInit } from '@angular/core';
import { ApiRestTestService } from '../api-rest-test.service';

@Component({
  selector: 'app-testdata',
  templateUrl: './testdata.component.html',
  styleUrls: ['./testdata.component.css']
})
export class TestdataComponent implements OnInit {
  data: any = [];

  constructor(public rest: ApiRestTestService) { }

  ngOnInit() {
    this.getTestData();
  }

  getTestData() {
    this.data = [];
    this.rest.getTestData().subscribe((data: {}) => {
      console.log(data);
      this.data = data;
    });
  }

}
