import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './_guards';
import { Role } from './_models';

import { HomeComponent } from './home/home.component';
import { MainscreenComponent } from './mainscreen/mainscreen.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LogInComponent } from './log-in/log-in.component';
import { StudentOrgAppFormComponent } from './student-org-app-form/student-org-app-form.component';
import { EduProfileManagementComponent } from './edu-profile-management/edu-profile-management.component';
import { StaffProfileManagementComponent } from './staff-profile-management/staff-profile-management.component';
import { JodDetailAnnouncementComponent } from './jod-detail-announcement/jod-detail-announcement.component';
import { StuQualificationcementComponent } from './stu-qualificationcement/stu-qualificationcement.component';
import { StuQualifyingStatusComponent } from './stu-qualifying-status/stu-qualifying-status.component';
import { UserManualComponent } from './user-manual/user-manual.component';
import { NewAccountComponent } from './new-account/new-account.component';
import { NotFoundComponent } from './not-found/not-found.component';
import {AddJodDetailAnnouncementComponent} from './jod-detail-announcement/add-job-detail-component/add-announcement.component'
import {ViewJodDetailAnnouncementComponent} from './jod-detail-announcement/view-job-detail-component/view-announcement.component'
import {UpdateJodDetailAnnouncementComponent} from './jod-detail-announcement/update-job-detail-component/update-announcement.component'

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'notfound',
    component: NotFoundComponent,
    data: { title: 'Error 404' }
  },
  {
    path: 'index',
    component: MainscreenComponent,
    data: { title: 'หน้าแรก' }
  },
  {
    path: 'login',
    component: LogInComponent,
    data: { title: 'เข้าสู่ระบบ' }
  },
  {
    path: 'sign-up',
    component: SignUpComponent,
    data: { title: 'สร้างบัญชี' }
  },
  {
    path: 'app-form',
    component: StudentOrgAppFormComponent,
    canActivate: [AuthGuard],
    data: { title: 'สมัครคัดเลือก' }
  },
  {
    path: 'profile-management/stu',
    component: EduProfileManagementComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'จัดการข้อมูลส่วนตัว',
      roles: [Role.User]
    }
  },
  {
    path: 'profile-management/staff',
    component: StaffProfileManagementComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'จัดการข้อมูลส่วนตัว',
      roles: [Role.Staff, Role.Admin]
    }
  },
  {
    path: 'announcement',
    component: JodDetailAnnouncementComponent,
    data: { title: 'ประกาศ' }
  },
  {
    path : 'add_announcement',
    component:AddJodDetailAnnouncementComponent,
    data :{ title: 'ประกาศบริษัท'}
  },
  {
    path: 'view_announcement',
    component: ViewJodDetailAnnouncementComponent,
    data:{title:'รายละเอียดของบริษัท'}
  },
  {
    path:'update_announcement',
    component:UpdateJodDetailAnnouncementComponent,
    data:{title:'แก้ไขรายละเอียดของบริษัท'}
  },
  {
    path: 'qualification',
    component: StuQualificationcementComponent,
    canActivate: [AuthGuard], data: {
      title: 'คัดเลือก',
      roles: [Role.Admin, Role.Staff, Role.Agent]
    }
  },
  {
    path: 'qualifying',
    component: StuQualifyingStatusComponent,
    data: { title: 'ดูผลการคัดเลือก' }
  },
  {
    path: 'UserManual',
    component: UserManualComponent,
    data: { title: 'แนะนำการใช้งาน' }
  },
  // -------------------- ADMIN
  {
    path: 'new-account',
    component: NewAccountComponent,
    canActivate: [AuthGuard],
    data: { title: 'เพิ่มผู้ใช้', roles: [Role.Admin] }
  },
  { path: '**', redirectTo: 'notfound', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
