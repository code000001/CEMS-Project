import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AnnouncementComponent } from './announcement/announcement.component';
import {LoginComponent} from './login/login.component';
import {MainscreenComponent} from './mainscreen/mainscreen.component';

@NgModule({
  declarations: [
    AppComponent,
    AnnouncementComponent,
    LoginComponent,
    MainscreenComponent
  ],
  imports: [
    NgbModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
