import { BrowserModule, Title } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS  } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgProgressHttpModule } from '@ngx-progressbar/http';
import { NgProgressModule } from '@ngx-progressbar/core';
import { NgSelectModule } from '@ng-select/ng-select';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';

import { JwtInterceptor, ErrorInterceptor } from './_helpers';
// import { fakeBackendProvider } from './_helpers';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TestdataComponent } from './testdata/testdata.component';
import { MainscreenComponent } from './mainscreen/mainscreen.component';
import { LoginscreenComponent } from './loginscreen/loginscreen.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { LogInComponent } from './log-in/log-in.component';
import { StudentOrgAppFormComponent } from './App-Form/student-org-app-form/student-org-app-form.component';
import { EduProfileManagementComponent } from './Profile-Management/edu-profile-management/edu-profile-management.component';
import { JodDetailAnnouncementComponent } from './jod-detail-announcement/jod-detail-announcement.component';
import { StuQualificationcementComponent } from './Qualificationcement/stu-qualificationcement/stu-qualificationcement.component';
import { StuQualifyingStatusComponent } from './Qualifying/stu-qualifying-status/stu-qualifying-status.component';
import { StaffProfileManagementComponent } from './Profile-Management/staff-profile-management/staff-profile-management.component';
import { NewAccountComponent } from './Admin/new-account/new-account.component';
import { NotFoundComponent } from './not-found/not-found.component';
import {NgxDatatableModule } from '@swimlane/ngx-datatable'
import {AddJodDetailAnnouncementComponent} from './jod-detail-announcement/add-job-detail-component/add-announcement.component'
import {ViewJodDetailAnnouncementComponent} from './jod-detail-announcement/view-job-detail-component/view-announcement.component'
import {UpdateJodDetailAnnouncementComponent} from './jod-detail-announcement/update-job-detail-component/update-announcement.component'
import { SkillTestManagementComponent } from './Profile-Management/skill-test-management/skill-test-management.component';

@NgModule({
  declarations: [
    AppComponent,
    TestdataComponent,
    MainscreenComponent,
    LoginscreenComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    LogInComponent,
    StudentOrgAppFormComponent,
    EduProfileManagementComponent,
    JodDetailAnnouncementComponent,
    ViewJodDetailAnnouncementComponent,
    UpdateJodDetailAnnouncementComponent,
    AddJodDetailAnnouncementComponent,
    StuQualificationcementComponent,
    StuQualifyingStatusComponent,
    StaffProfileManagementComponent,
    NewAccountComponent,
    NotFoundComponent,
    SkillTestManagementComponent
  ],
  imports: [
    NgbModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NgxDatatableModule,
    AngularFontAwesomeModule,
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    NgProgressModule.withConfig({
      spinner : false,
      color: '#fff'
    }),
    NgProgressHttpModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    Title,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent],
  exports: [BsDropdownModule, TooltipModule, ModalModule]
})
export class AppModule { }
