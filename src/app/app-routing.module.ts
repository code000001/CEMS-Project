import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './_guards';
import { Role } from './_models';

import { SiteLayoutComponent } from './site-layout/site-layout.component';
import { HomeComponent } from './home/home.component';
import { MainscreenComponent } from './mainscreen/mainscreen.component';
import { LoginscreenComponent } from './loginscreen/loginscreen.component';
import { LogInComponent } from './log-in/log-in.component';
import { StudentOrgAppFormComponent } from './App-Form/student-org-app-form/student-org-app-form.component';
import { EduProfileManagementComponent } from './Profile-Management/edu-profile-management/edu-profile-management.component';
import { StaffProfileManagementComponent } from './Profile-Management/staff-profile-management/staff-profile-management.component';
import { JobDetailAnnouncementComponent } from './job-detail-announcement/job-detail-announcement/job-detail-announcement.component';
import { StuQualificationcementComponent } from './Qualificationcement/stu-qualificationcement/stu-qualificationcement.component';
import { StuQualifyingStatusComponent } from './Qualifying/stu-qualifying-status/stu-qualifying-status.component';
import { NewAccountComponent } from './Admin/new-account/new-account.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AddJobDetailAnnouncementComponent} from './job-detail-announcement/add-job-detail-component/add-announcement.component'
import { ViewJobDetailAnnouncementComponent} from './job-detail-announcement/view-job-detail-component/view-announcement.component'
import { UpdateJobDetailAnnouncementComponent} from './job-detail-announcement/update-job-detail-component/update-announcement.component'
import { SkillTestManagementComponent } from './Profile-Management/skill-test-management/skill-test-management.component';
import { InsManagementComponent } from './Profile-Management/ins-management/ins-management.component';
import { DownloadInsComponent } from './Profile-Management/download-ins/download-ins.component';
import { UploadTranscriptComponent } from './Profile-Management/upload-transcript/upload-transcript.component';
import { UploadResumeComponent } from './Profile-Management/upload-resume/upload-resume.component';
import { StaffTrainingManagementComponent } from './Profile-Management/staff-training-management/staff-training-management.component';
import { StaffCoopComponent } from './Profile-Management/staff-coop/staff-coop.component';
import {StdViewsTrainningComponent} from './Profile-Management/std-views-trainning/std-views-trainning.component';

const routes: Routes = [
  // Layout with header and footer ---------- ต้องมีส่วนหัว-ท้าย
  { path: '', component: SiteLayoutComponent,
    children : [
      // -------------------- Public สามารถเข้าถึงได้โดยไม่ต้องเข้าสู่ระบบ
      { path: '',             component: HomeComponent },
      { path: 'index',        component: MainscreenComponent,            data: { title: 'หน้าแรก' }},
      { path: 'login',        component: LogInComponent,                 data: { title: 'เข้าสู่ระบบ' }},
      { path: 'announcement', component: JobDetailAnnouncementComponent, data: { title: 'ประกาศ' }},
      { path: 'qualifying', component: StuQualifyingStatusComponent, canActivate: [AuthGuard], data: { title: 'ดูผลการคัดเลือก', roles: [Role.User] }},

      // -------------------- After login สามารถเข้าถึงได้โดยเข้าสู่ระบบแล้ว
      // - roles: สิทธิในการเข้าถึงหน้านั้น ๆ
      // === Role.User นิสิต/นักศึกษา
      // === Role.Staff เจ้าหน้าที่ของมหา'ลัย
      // === Role.Agent เจ้าหน้าที่ของบริษัท
      { path: 'app-form/:id/:ann', component: StudentOrgAppFormComponent, canActivate: [AuthGuard], data: { title: 'สมัครคัดเลือก', roles: [Role.User] } },
      { path: 'profile-management', component: EduProfileManagementComponent, canActivate: [AuthGuard], data: { title: 'จัดการข้อมูลส่วนตัว', roles: [Role.User] } },
      { path: 'profile-management/ins', component: InsManagementComponent, canActivate: [AuthGuard], data: { title: 'ใบสมัครเป็นนิสิตสหกิจศึกษา', roles: [Role.User] } },
      { path: 'profile-management/ins/:id', component: InsManagementComponent, canActivate: [AuthGuard], data: { title: 'ใบสมัครเป็นนิสิตสหกิจศึกษา', roles: [Role.Staff, Role.Admin, Role.Agent] } },
      { path: 'profile-management/skill-test', component: SkillTestManagementComponent, canActivate: [AuthGuard], data: { title: 'ผลการสอบทักษะ', roles: [Role.User] } },
      { path: 'profile-management/upload-transcript', component: UploadTranscriptComponent, canActivate: [AuthGuard], data: { title: 'อัปโหลดผลการศึกษา', roles: [Role.User] } },
      { path: 'profile-management/upload-resume', component: UploadResumeComponent, canActivate: [AuthGuard], data: { title: 'อัปโหลดเรซูเม', roles: [Role.User] } },
      { path: 'profile-management/staff', component: StaffProfileManagementComponent, canActivate: [AuthGuard], data: { title: 'จัดการข้อมูลส่วนตัว', roles: [Role.Staff, Role.Admin] } },
      { path: 'profile-management/staff-training', component: StaffTrainingManagementComponent, canActivate: [AuthGuard], data: { title: 'จัดการชั่วโมงอบรมวิชาการ', roles: [Role.Staff, Role.Admin] } },
      { path: 'profile-management/staff-coop', component: StaffCoopComponent, canActivate: [AuthGuard], data: { title: 'จัดการชั่วโมงอบรมเตรียมความพร้อมสหกิจศึกษา', roles: [Role.Staff, Role.Admin] } },
      { path: 'profile-management/std-views-trainning', component: StdViewsTrainningComponent, canActivate: [AuthGuard], data: { title: 'อัปโหลดเรซูเม', roles: [Role.User] }},
      { path: 'add_announcement', component: AddJobDetailAnnouncementComponent, data : { title: 'ประกาศบริษัท'} },
      { path: 'view_announcement/:id', component: ViewJobDetailAnnouncementComponent, data: { title:'รายละเอียดของบริษัท'} },
      { path: 'update_announcement/:id', component: UpdateJobDetailAnnouncementComponent, data: { title:'แก้ไขรายละเอียดของบริษัท'} },
      { path: 'qualification', component: StuQualificationcementComponent, canActivate: [AuthGuard], data: { title: 'คัดเลือก', roles: [Role.Admin, Role.Staff, Role.Agent, Role.User] } },
      // -------------------- ADMIN
      { path: 'new-account', component: NewAccountComponent, canActivate: [AuthGuard], data: { title: 'เพิ่มผู้ใช้', roles: [Role.Admin] }},
    ]
  },
  
  // Layout without header and footer  -------------------- หน้าที่ไม่ต้องมีส่วนหัว-ท้าย
  { path: 'profile-management/downloadins', component: DownloadInsComponent, data: { title: 'ดาวน์โหลดใบสมัครเป็นนิสิตสหกิจศึกษา'} },

  // Other and ERROR
  { path: 'notfound', component: NotFoundComponent, data: { title: 'Error 404' } },
  { path: '**', redirectTo: 'notfound', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
