import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AnnouncementComponent } from './announcement/announcement.component';
import { MainscreenComponent } from './mainscreen/mainscreen.component';
import { LoginComponent } from './login/login.component';
import {ShowAnnouncementComponent} from './announcement/show/show_announcement.component';
import {AddAnnouncementComponent} from './announcement/add/add_announcement.component'
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { AppComponent } from './app.component';


const routes: Routes = [
  { path : 'data', component: AnnouncementComponent},
  { path : 'login', component: LoginComponent},
  {path: 'announcement', component: ShowAnnouncementComponent},
  {path: 'add_anouncement', component:AddAnnouncementComponent},
  { path: '**',redirectTo: 'index',pathMatch: 'full'},
  
  { path: 'index', component: MainscreenComponent}
];

@NgModule({
  declarations: [
    ShowAnnouncementComponent,
    AppComponent,
    AnnouncementComponent,
    LoginComponent,
    MainscreenComponent,
    AddAnnouncementComponent
],
  imports: [RouterModule.forRoot(routes),NgxDatatableModule],
  exports: [RouterModule],
  bootstrap: [
    ShowAnnouncementComponent,
    AppComponent,
    AnnouncementComponent,
    LoginComponent,
    MainscreenComponent,
    AddAnnouncementComponent]
})
export class AppRoutingModule { }
