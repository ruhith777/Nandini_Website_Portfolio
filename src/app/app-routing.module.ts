import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Screen1Component } from './screen1/screen1.component';
import { Screen2Component } from './screen2/screen2.component';
import { Screen3Component } from './screen3/screen3.component';
import { Screen4Component } from './screen4/screen4.component';
import { Screen5Component } from './screen5/screen5.component';
import { Screen6Component } from './screen6/screen6.component';

import { Screen7Component } from './screen7/screen7.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {path:'screen1',component:Screen1Component},
  {path:'screen2',component:Screen2Component},
  {path:'screen3',component:Screen3Component},
  {path:'screen4',component:Screen4Component},
  {path:'screen5',component:Screen5Component},
  {path:'screen6',component:Screen6Component},
  {path:'screen7',component:Screen7Component},
  {path:'dashboard',component:DashboardComponent},
  {path:'home',component:HomeComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
