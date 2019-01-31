import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AnnouncementComponent } from './announcement/announcement.component';
import { MainscreenComponent } from './mainscreen/mainscreen.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path : 'data', component: AnnouncementComponent},
  { path : 'login', component: LoginComponent},
  { path: '',
    redirectTo: '/index',
    pathMatch: 'full'
  },
  { path: '**',
    component: MainscreenComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
