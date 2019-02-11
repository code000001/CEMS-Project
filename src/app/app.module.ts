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
import { SignUpComponent } from './sign-up/sign-up.component';
import { LogInComponent } from './log-in/log-in.component';
import { StudentOrgAppFormComponent } from './student-org-app-form/student-org-app-form.component';
import { EduProfileManagementComponent } from './edu-profile-management/edu-profile-management.component';
import { JodDetailAnnouncementComponent } from './jod-detail-announcement/jod-detail-announcement.component';
import { StuQualificationcementComponent } from './stu-qualificationcement/stu-qualificationcement.component';
import { StuQualifyingStatusComponent } from './stu-qualifying-status/stu-qualifying-status.component';
import { UserManualComponent } from './user-manual/user-manual.component';
import { StaffProfileManagementComponent } from './staff-profile-management/staff-profile-management.component';
import { NewAccountComponent } from './new-account/new-account.component';
import { NotFoundComponent } from './not-found/not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    TestdataComponent,
    MainscreenComponent,
    LoginscreenComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    SignUpComponent,
    LogInComponent,
    StudentOrgAppFormComponent,
    EduProfileManagementComponent,
    JodDetailAnnouncementComponent,
    StuQualificationcementComponent,
    StuQualifyingStatusComponent,
    UserManualComponent,
    StaffProfileManagementComponent,
    NewAccountComponent,
    NotFoundComponent
  ],
  imports: [
    NgbModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
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
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

    // provider used to create fake backend
    // fakeBackendProvider
  ],
  bootstrap: [AppComponent],
  exports: [BsDropdownModule, TooltipModule, ModalModule]
})
export class AppModule { }
