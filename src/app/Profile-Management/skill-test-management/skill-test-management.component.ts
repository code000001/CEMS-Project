import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { StudentSkillInterface } from '../../_models/std_skill-interface';
import { StudentSkillSerivce } from '../../services/std_skill.service';
import { AuthGuard } from '../../_guards';
import { User, Role } from '../../_models';
import { UserService, AuthenticationService } from '../../_services';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-skill-test-management',
  templateUrl: './skill-test-management.component.html',
  styleUrls: ['./skill-test-management.component.css']
})
export class SkillTestManagementComponent implements OnInit {

  Skill: FormGroup;
  currentUser: User;
  userFromApi: User;
  std_skill: StudentSkillInterface;
  // std_skill: StudentSkillInterface;
  submitted = false;
  message: string;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private authenticationService: AuthenticationService,
    private studentskilldataService: StudentSkillSerivce,
    private authGuardService: AuthGuard) 
    {
    this.userFromApi = this.currentUser = this.authenticationService.currentUserValue;
    }

  ngOnInit() {
    //this.getstudentdata(this.currentUser.userId);
    this.getstudentskilldata(this.userFromApi.userId);

    this.Skill = this.fb.group({
      stdSkillHtml: null,
      stdSkillCss: null,
      stdSkillPhp: null,
      stdSkillSql: null,
      stdSkillJs: null
    });
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

  getstudentskilldata(stdId: number) {
    // console.log("std id : ", stdId);
    // console.log("std : ", this.userFromApi);
    this.studentskilldataService.getstdskillBystdId(stdId).subscribe((data) => {
      this.std_skill = data;
      console.log("std : ", this.std_skill);
    });
  }

  addupSkilltest(){
    if (this.Skill.get('stdSkillHtml').value) { this.std_skill.stdSkillHtml = this.Skill.get('stdSkillHtml').value; }
    if (this.Skill.get('stdSkillCss').value) { this.std_skill.stdSkillCss = this.Skill.get('stdSkillCss').value; }
    if (this.Skill.get('stdSkillPhp').value) { this.std_skill.stdSkillPhp = this.Skill.get('stdSkillPhp').value; }
    if (this.Skill.get('stdSkillSql').value) { this.std_skill.stdSkillSql = this.Skill.get('stdSkillSql').value; }
    if (this.Skill.get('stdSkillJs').value) { this.std_skill.stdSkillJs = this.Skill.get('stdSkillJs').value; }
    this.submitted = true;
    this.studentskilldataService.putstdskillBystdId(this.userFromApi.userId, this.std_skill).subscribe(() => this.message = "Successfully!");
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
