import { Component, OnInit } from '@angular/core';
import { User, Role } from 'src/app/_models';
import { Router } from '@angular/router';
import { UserService, AuthenticationService } from 'src/app/_services';
import { AuthGuard } from 'src/app/_guards';
import { StudentDataService } from 'src/app/services/std-ins-form.service';
import { StudentdataInterface } from 'src/app/_models/stu-data-interface';
import { StudentdataInterfaceQualifying } from 'src/app/_models/stu-data-qualifying-interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-stu-qualificationcement',
  templateUrl: './stu-qualificationcement.component.html',
  styleUrls: ['./stu-qualificationcement.component.css']
})
export class StuQualificationcementComponent implements OnInit {
  id: number
  currentUser: User;
  userFromApi: User;
  stdInqual: StudentdataInterface[];
  stdQualified: StudentdataInterface[];
  stdAppForm: StudentdataInterface[];

  constructor(  private router: Router,
    private userService: UserService,
    private studentdataService: StudentDataService,
    private authenticationService: AuthenticationService,
    private authGuardService: AuthGuard) {  this.userFromApi = this.currentUser = this.authenticationService.currentUserValue;}


    ngOnInit() {
      this.getOrganization();
      if(localStorage.getItem('currentUser') != null){
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
      }
    }

    updateToQualifying(id : number){
      let stdInQualifying: StudentdataInterfaceQualifying = {
        id: null,
        stdAccId: id,
        stdStatusId: 4,
        stdId: null,
        stdTestScore: null,
        stdHrPrepare: null,
        stdHrConference: null
      };

      this.studentdataService.putStatusUpdate(stdInQualifying)
    .subscribe((m) => {
    },(err)=>{
      Swal.fire({
        type: 'warning',
        title: 'ไม่สามารถบันทึกข้อมูลได้',
        showConfirmButton: false,
        timer: 5000
      })     
    },()=>{
      
        Swal.fire({
              type: 'success',
              title: 'บันทึกข้อมูลสำเร็จ',
              showConfirmButton: false,
              timer: 1500
            })     
            setTimeout(()=> window.location.reload(), 1500)  
    })
    }

    updateToPass(id: number){
      let stdInQualifying: StudentdataInterfaceQualifying = {
        id: null,
        stdAccId: id,
        stdStatusId: 5,
        stdId: null,
        stdTestScore: null,
        stdHrPrepare: null,
        stdHrConference: null
      };

      this.studentdataService.putStatusUpdate(stdInQualifying)
    .subscribe((m) => {
    },(err)=>{
      Swal.fire({
        type: 'warning',
        title: 'ไม่สามารถบันทึกข้อมูลได้',
        showConfirmButton: false,
        timer: 5000
      })     
    },()=>{
      
        Swal.fire({
              type: 'success',
              title: 'บันทึกข้อมูลสำเร็จ',
              showConfirmButton: false,
              timer: 1500
            })
            setTimeout(()=> window.location.reload(), 1500)     
            
    })

    }

    updateToFail(id: number){
      let stdInQualifying: StudentdataInterfaceQualifying = {
        id: null,
        stdAccId: id,
        stdStatusId: 2,
        stdId: null,
        stdTestScore: null,
        stdHrPrepare: null,
        stdHrConference: null
      };

      this.studentdataService.putStatusUpdate(stdInQualifying)
    .subscribe((m) => {
    },(err)=>{
      Swal.fire({
        type: 'warning',
        title: 'ไม่สามารถบันทึกข้อมูลได้',
        showConfirmButton: false,
        timer: 5000
      })     
    },()=>{
      
        Swal.fire({
              type: 'success',
              title: 'บันทึกข้อมูลสำเร็จ',
              showConfirmButton: false,
              timer: 1500
            })     
            setTimeout(()=> window.location.reload(), 1500)  
    })
    }
  
    getOrganization(): void {
       this.studentdataService.getStudentDataQualification(3)
         .subscribe(
           resultData => { 
             this.stdAppForm = resultData;
           },
        )
        this.studentdataService.getStudentDataQualification(4)
         .subscribe(
           resultData => { 
             this.stdInqual = resultData;
           },
        )
        this.studentdataService.getStudentDataQualification(5)
         .subscribe(
           resultData => { 
             this.stdQualified = resultData;
           },
        )
      
    }
  
  get isSignin() {
    if (this.currentUser != null) {
      return true;
    }
    return false;
  }

  get isUser() {
    return this.currentUser && this.currentUser.accTypeId === Role.User;
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
}
