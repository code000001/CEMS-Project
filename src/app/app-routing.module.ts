import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainscreenComponent } from './mainscreen/mainscreen.component';
import { LoginscreenComponent } from './loginscreen/loginscreen.component';


const routes: Routes = [
  { path : 'index', component: MainscreenComponent},
  { path : 'login', component: LoginscreenComponent},
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
