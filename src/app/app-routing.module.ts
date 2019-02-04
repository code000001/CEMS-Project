import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AnnouncementComponent } from './announcement/announcement.component';
import { MainscreenComponent } from './mainscreen/mainscreen.component';
import { LoginComponent } from './login/login.component';
import {ShowAnnouncementComponent} from './announcement/show/show_announcement.component';


const routes: Routes = [
  { path : 'data', component: AnnouncementComponent},
  { path : 'login', component: LoginComponent},
  {path: 'announcement', component: ShowAnnouncementComponent},
  { path: '**',redirectTo: 'index',pathMatch: 'full'},
  { path: 'index', component: MainscreenComponent}
];

@NgModule({
  declarations: [
    ShowAnnouncementComponent,
],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  bootstrap: [AnnouncementComponent]
})
export class AppRoutingModule { }
