import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StudentdataInterface } from '../../_models/stu-data-interface';
import { StudentDataService } from '../../services/std-ins-form.service';

@Component({
  selector: 'app-download-ins',
  templateUrl: './download-ins.component.html',
  styleUrls: ['./download-ins.component.css']
})
export class DownloadInsComponent implements OnInit {

  std: StudentdataInterface
  
  constructor(){}//private route: ActivatedRoute, private studentdataService: StudentDataService) { }

  ngOnInit() {
    // this.getstudentdata()
  }

  // getstudentdata(stdId: number){
  //   this.studentdataService.getstddataBystdId(stdId)

  // }


}
