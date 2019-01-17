import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TestdataComponent } from './testdata/testdata.component';

const routes: Routes = [
  { path : 'data', component: TestdataComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
