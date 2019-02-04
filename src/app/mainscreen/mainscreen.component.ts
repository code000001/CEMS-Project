import { Component, OnInit } from '@angular/core';
import { ApiRestTestService } from '../api-rest-test.service';

@Component({
  selector: 'app-mainscreen',
  templateUrl: './mainscreen.component.html'
})
export class MainscreenComponent implements OnInit {
  data: any = [];

  constructor(public rest: ApiRestTestService) { }

  ngOnInit() {
    this.getTestData();
  }

  getTestData() {
    this.data = [];
    // this.rest.getTestData().subscribe((data: {}) => {
    //   console.log(data);
    //   this.data = data;
    // });
  }
}
