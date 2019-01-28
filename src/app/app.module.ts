import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TestdataComponent } from './testdata/testdata.component';
import { MainscreenComponent } from './mainscreen/mainscreen.component';
import { LoginscreenComponent } from './loginscreen/loginscreen.component';

@NgModule({
  declarations: [
    AppComponent,
    TestdataComponent,
    MainscreenComponent,
    LoginscreenComponent
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
