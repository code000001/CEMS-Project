import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {StudentdataInterface} from '../../_models/stu-data-interface';

@Component({
  selector: 'app-staff-training-management',
  templateUrl: './staff-training-management.component.html',
  styleUrls: ['./staff-training-management.component.css']
})
export class StaffTrainingManagementComponent implements OnInit {

  id: number
  stdData: StudentdataInterface[];

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.getStuById();
  }

  getStuById(){
    const id = +this.route.snapshot.paramMap.get('id');
  }

}
