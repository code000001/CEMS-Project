import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthGuard } from '../../_guards';
import { User, Role } from '../../_models';
import { UserService, AuthenticationService } from '../../_services';
import { StudentdataInterface } from '../../_models/stu-data-interface';
import { StudentDataService } from '../../services/std-ins-form.service';
import { StaffHrManagementService } from '../../services/staff-hr-management.service';
import Swal from 'sweetalert2';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-staff-profile-management',
  templateUrl: './staff-profile-management.component.html',
  styleUrls: ['./staff-profile-management.component.css']
})
export class StaffProfileManagementComponent implements OnInit {

  currentUser: User;
  userFromApi: User;
  HourTrain: FormGroup;
  std_trainning: StudentdataInterface[];
  submitted = false;
  message: string;

  TestScore = [{ id: 'Y', th: 'ผ่าน' }, { id: 'N', th: 'ไม่ผ่าน'}];
  
  headElements = ['ลำดับ' ,'รหัสนิสิต', 'ชื่อ - นามสกุล', 'วิชาการ(ชั่วโมง)', 'เตรียมความพร้อม(ชั่วโมง)', 'สถานะผลสอบทักษะ', 'จัดการ'];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService,
    private authenticationService: AuthenticationService,
    private staffHrmanagementService: StaffHrManagementService,
    private authGuardService: AuthGuard,
    private studentdataService: StudentDataService, config: NgbModalConfig, private modalService: NgbModal) { 
      this.userFromApi = this.currentUser = this.authenticationService.currentUserValue;
    config.backdrop = 'static';
    config.keyboard = false; 
    }

  ngOnInit() {
    this.getAllStudentTrain();

    this.HourTrain = this.fb.group({
      index: null,
      stdAccId: null,
      stdHrprepare: null,
      stdHrConference: null,
      stdTestScore: null
    });

  }

  selectTestScore($event){
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

  addupHourTrain(content){
    
    var index = this.HourTrain.get('index').value;
    // console.log(this.HourTrain.get('stdTestScore').value);
    if (this.HourTrain.get('stdHrprepare').value) { this.std_trainning[index].stdHrprepare = this.HourTrain.get('stdHrprepare').value;}
    if (this.HourTrain.get('stdHrConference').value) { this.std_trainning[index].stdHrConference = this.HourTrain.get('stdHrConference').value; }
    if (this.HourTrain.get('stdTestScore').value) { this.std_trainning[index].stdTestScore = this.HourTrain.get('stdTestScore').value; }
    this.submitted = true;
    console.log(this.std_trainning[index]);
    this.staffHrmanagementService.putstdHourTrainBystdId(this.HourTrain.get('stdAccId').value, this.std_trainning[index]).subscribe(() => this.message = "Successfully!");
    this.modalService.dismissAll();
  }

  editHrTrain(){
    Swal.fire({
      title: 'Submit your Github username',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      confirmButtonText: 'Look up',
      showLoaderOnConfirm: true
    })
  }

  open(content, index: number, id : number,confer: number,prepare: number,testscore: string) {
    // console.log(id);
    // console.log(confer);
    this.HourTrain.get('stdHrprepare').setValue(prepare);
    this.HourTrain.get('stdHrConference').setValue(confer);
    this.HourTrain.get('stdAccId').setValue(id);
    this.HourTrain.get('index').setValue(index);
    this.HourTrain.get('stdTestScore').patchValue(testscore);
    // this.HourTrain.get('stdTestScore').setValue(testscore);
    this.modalService.open(content);
  }

  SuccessAlert() {
    Swal.fire({
      type: 'success',
      title: 'บันทึกข้อมูลสำเร็จ',
      showConfirmButton: false,
      timer: 1500
    })
  }
}
