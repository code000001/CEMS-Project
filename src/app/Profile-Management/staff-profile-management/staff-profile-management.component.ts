import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthGuard } from '../../_guards';
import { User, Role } from '../../_models';
import { UserService, AuthenticationService } from '../../_services';
import { StudentdataInterface } from '../../_models/stu-data-interface';
import { StudentDataService } from '../../services/std-ins-form.service';
// import { StaffHrManagrmentService } from '../../services/staff-hr-managrment.service';
import { StaffHrManagementService } from '../../services/staff-hr-management.service';
// import { StaffHrManagementService } from '../../services/staff-hr-managrment.service';


@Component({
  selector: 'app-staff-profile-management',
  templateUrl: './staff-profile-management.component.html',
  styleUrls: ['./staff-profile-management.component.css']
})
export class StaffProfileManagementComponent implements OnInit {

  currentUser: User;
  userFromApi: User;
  std_trainning: StudentdataInterface[];

  constructor(private router: Router,
    private userService: UserService,
    private authenticationService: AuthenticationService,
    private staffHrmanagementService: StaffHrManagementService,
    private authGuardService: AuthGuard,
    private studentdataService: StudentDataService) { this.userFromApi = this.currentUser = this.authenticationService.currentUserValue; }

  ngOnInit() {
    this.getAllStudentTrain();
  }

  get isSignin() {
    if (this.currentUser != null) {
      return true;
    }
    return false;
  }

  get isStaff() {
    return this.currentUser && this.currentUser.accTypeId === Role.Staff;
  }

  get isAgent() {
    return this.currentUser && this.currentUser.accTypeId === Role.Agent;
  }

  get isAdmin() {
    return this.currentUser && this.currentUser.accTypeId === Role.Admin;
  }

  getAllStudentTrain(){
    this.staffHrmanagementService.getAllStudentTrainning().subscribe((data) => {
      console.log(data);
      this.std_trainning = data;
    });
  }

}
