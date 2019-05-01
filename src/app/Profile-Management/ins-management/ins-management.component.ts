import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { StudentdataInterface } from '../../_models/stu-data-interface';
import { StudentDataService } from '../../services/std-ins-form.service';
import { AuthGuard } from '../../_guards';
import { User, Role } from '../../_models';
import { UserService, AuthenticationService } from '../../_services';
import Swal from 'sweetalert2';
// declare var require: any;

@Component({
  selector: 'app-ins-management',
  templateUrl: './ins-management.component.html',
  styleUrls: ['./ins-management.component.css']
})
export class InsManagementComponent implements OnInit {
  StdForm: FormGroup;
  currentUser: User;
  userFromApi: User;
  add_std: StudentdataInterface;
  submitted = false;
  message: string;
  year = [];
  selectedYear: number;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private authenticationService: AuthenticationService,
    private studentdataService: StudentDataService,
    private authGuardService: AuthGuard) {
    this.userFromApi = this.currentUser = this.authenticationService.currentUserValue;
    for (var i = 1; i <= 8; i++) {
      this.year.push(i);
    }
  }

  ngOnInit() {

    // const Swal = require('sweetalert2');

    this.getstudentdata(this.userFromApi.userId);

    this.StdForm = this.fb.group({
      stdId: null,
      stdYear: null,
      stdCredit: null,
      stdGpax: null,
      stdCourse: null,
      stdBranch: null,
      stdAddressPartic: null,
      stdAddressNow: null,
      stdTel: null,
      stdMobile: null,
      stdEmail: null,
      stdpareFname: null,
      stdpareLname: null,
      stdpareRelation: null,
      stdpareAddress: null,
      stdpareMobile: null,
      stdpareTel: null,
      stdpareEmail: null,
      stdLastnameTh: null,
      stdLastnameEn: null,
      stdPrefixEn: null,
      stdPrefixTh: null,
      stdFirstnameEn: null,
      stdFirstnameTh: null
    });

    

    // this.StdForm.get('stdPrefixTh').setValue(this.add_std.stdPrefixTh);
    // this.StdForm.get('stdPrefixEn').setValue(this.add_std.stdPrefixEn);

  }

  selectYear(event){
    this.selectedYear = event;
    console.log('year = ', event);
    // this.StdForm.get('stdYear').patchValue(this.add_std.stdYear);
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

  getstudentdata(stdId: number) {
    // console.log("std id : ", stdId);
    // var a = parseInt('32');
    this.studentdataService.getstddataBystdId(stdId).subscribe((data) => {
      console.log("data : ", data);
      this.selectedYear = data.stdYear;
      this.add_std = data; console.log("data : ", data); console.log("std : ", this.add_std);
    }
      // console.log("data : ", this.add_std);
    );
  }

  addupStudentForm() {
    // console.log(this.StdForm.get('stdFirstnameTh').value);
    // this.add_std.stdId = this.StdForm.get('stdId').value;
    if (this.StdForm.get('stdId').value) { this.add_std.stdId = this.StdForm.get('stdId').value; }
    if (this.StdForm.get('stdPrefixTh').value) { this.add_std.stdPrefixTh = this.StdForm.get('stdPrefixTh').value; }
    if (this.StdForm.get('stdFirstnameTh').value) { this.add_std.stdFirstnameTh = this.StdForm.get('stdFirstnameTh').value; }
    if (this.StdForm.get('stdLastnameTh').value) { this.add_std.stdLastnameTh = this.StdForm.get('stdLastnameTh').value; }
    if (this.StdForm.get('stdPrefixEn').value) { this.add_std.stdPrefixEn = this.StdForm.get('stdPrefixEn').value; }
    if (this.StdForm.get('stdFirstnameEn').value) { this.add_std.stdFirstnameEn = this.StdForm.get('stdFirstnameEn').value; }
    if (this.StdForm.get('stdLastnameEn').value) { this.add_std.stdLastnameEn = this.StdForm.get('stdLastnameEn').value; }
    if (this.StdForm.get('stdLastnameEn').value) { this.add_std.stdLastnameEn = this.StdForm.get('stdLastnameEn').value; }
    if (this.StdForm.get('stdLastnameEn').value) { this.add_std.stdLastnameEn = this.StdForm.get('stdLastnameEn').value; }
    if (this.StdForm.get('stdYear').value) { this.add_std.stdYear = this.StdForm.get('stdYear').value; }
    if (this.StdForm.get('stdYear').value) { this.add_std.stdYear = this.StdForm.get('stdYear').value; }
    if (this.StdForm.get('stdYear').value) { this.add_std.stdYear = this.StdForm.get('stdYear').value; }
    if (this.StdForm.get('stdYear').value) { this.add_std.stdYear = this.StdForm.get('stdYear').value; }
    if (this.StdForm.get('stdCredit').value) { this.add_std.stdCredit = this.StdForm.get('stdCredit').value; }
    if (this.StdForm.get('stdGpax').value) { this.add_std.stdGpax = this.StdForm.get('stdGpax').value; }
    if (this.StdForm.get('stdGpax').value) { this.add_std.stdGpax = this.StdForm.get('stdGpax').value; }
    if (this.StdForm.get('stdBranch').value) { this.add_std.stdBranch = this.StdForm.get('stdBranch').value; }
    if (this.StdForm.get('stdCourse').value) { this.add_std.stdCourse = this.StdForm.get('stdCourse').value; }
    if (this.StdForm.get("stdAddressPartic").value) { this.add_std.stdAddressPartic = this.StdForm.get("stdAddressPartic").value; }
    if (this.StdForm.get('stdMobile').value) { this.add_std.stdMobile = this.StdForm.get('stdMobile').value; }
    if (this.StdForm.get('stdTel').value) { this.add_std.stdTel = this.StdForm.get('stdTel').value; }
    if (this.StdForm.get('stdEmail').value) { this.add_std.stdEmail = this.StdForm.get('stdEmail').value; }
    if (this.StdForm.get('stdAddressNow').value) { this.add_std.stdAddressNow = this.StdForm.get('stdAddressNow').value; }
    if (this.StdForm.get('stdpareFname').value) { this.add_std.stdpareFname = this.StdForm.get('stdpareFname').value; }
    if (this.StdForm.get('stdpareLname').value) { this.add_std.stdpareLname = this.StdForm.get('stdpareLname').value; }
    if (this.StdForm.get('stdpareRelation').value) { this.add_std.stdpareRelation = this.StdForm.get('stdpareRelation').value; }
    if (this.StdForm.get('stdpareAddress').value) { this.add_std.stdpareAddress = this.StdForm.get('stdpareAddress').value; }
    if (this.StdForm.get('stdpareMobile').value) { this.add_std.stdpareMobile = this.StdForm.get('stdpareMobile').value; }
    if (this.StdForm.get('stdpareTel').value) { this.add_std.stdpareTel = this.StdForm.get('stdpareTel').value; }
    if (this.StdForm.get('stdpareEmail').value) { this.add_std.stdpareEmail = this.StdForm.get('stdpareEmail').value; }
    // console.log(this.add_std.stdPrefixTh);
    this.submitted = true;
    this.studentdataService.putstddataBystdId(this.userFromApi.userId, this.add_std).subscribe(() => this.message = "Successfully!");
    // this.studentdataService.poststddataBystdId(stdId)
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
