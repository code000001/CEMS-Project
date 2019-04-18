import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StudentSkillInterface } from '../../_models/std_skill-interface';
import { StudentSkillSerivce } from '../../services/std_skill.service';
import { AuthGuard } from '../../_guards';
import { User, Role } from '../../_models';
import { UserService, AuthenticationService } from '../../_services';

@Component({
  selector: 'app-skill-test-management',
  templateUrl: './skill-test-management.component.html',
  styleUrls: ['./skill-test-management.component.css']
})
export class SkillTestManagementComponent implements OnInit {

  currentUser: User;
  userFromApi: User;
  std_skill: any

  constructor(private route: ActivatedRoute,
    private authenticationService: AuthenticationService,
    private studentskilldataService: StudentSkillSerivce,
    private authGuardService: AuthGuard) 
    {
    this.userFromApi = this.currentUser = this.authenticationService.currentUserValue;
    }

  ngOnInit() {
    //this.getstudentdata(this.currentUser.userId);
    this.getstudentskilldata(this.currentUser.userId);
  }y

  get isSignin() {
    if (this.currentUser != null) {
      return true;
    }
    return false;
  }

  get isUser() {
    return this.currentUser && this.currentUser.userId === Role.User;
  }

  getstudentskilldata(stdId: number) {

    // console.log("std id : ", stdId);
    // console.log("std : ", this.userFromApi);
    this.studentskilldataService.getstdskillBystdId(stdId).subscribe((data: {}) => {
      this.std_skill = data;
    });
  }

}
