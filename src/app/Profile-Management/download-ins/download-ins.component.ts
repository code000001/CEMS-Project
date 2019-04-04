import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StudentdataInterface } from '../../_models/stu-data-interface';
import { StudentDataService } from '../../services/std-ins-form.service';
import { AuthGuard } from '../../_guards';
import { User, Role } from '../../_models';
import { UserService, AuthenticationService } from '../../_services';

@Component({
  selector: 'app-download-ins',
  templateUrl: './download-ins.component.html',
  styleUrls: ['./download-ins.component.css']
})
export class DownloadInsComponent implements OnInit {

  currentUser: User;
  userFromApi: User;
  std: any
  
  constructor(
    private route: ActivatedRoute, 
    private authenticationService: AuthenticationService, 
    private studentdataService: StudentDataService,
    private authGuardService: AuthGuard
  ) { 
    this.userFromApi = this.currentUser = this.authenticationService.currentUserValue;
  }

  ngOnInit() {
    // this.getstudentdata(this.currentUser.userId);
    this.getstudentdata(this.currentUser.userId);
    // console.log("std id : ", this.currentUser.userId);
     //this.getstudentdata()
  }
  get isSignin() {
    if (this.currentUser != null) {
      return true;
    }
    return false;
  }

  get isUser() {
    return this.currentUser && this.currentUser.userId === Role.User;
  }

  getstudentdata(stdId: number){

    // console.log("std id : ", stdId);
    // console.log("std : ", this.userFromApi);
    this.studentdataService.getstdBystdId(stdId).subscribe((data: {}) => {
    
      this.std = data;
    });
  }


}
