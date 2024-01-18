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
import { MultiSelectComponent } from './multi-select/multi-select.component';
import { LoginComponent } from './login/login.component';
import { ScreenRouteComponent } from './screen-route/screen-route.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ConfigurationComponent } from './configuration/configuration.component';
import { BulkuploadComponent } from './bulkupload/bulkupload.component';
import { BulkParentChildComponent } from './bulk-parent-child/bulk-parent-child.component';
import { TemperatureComponent } from './temperature/temperature.component';
import { QRCodeComponent } from './qrcode/qrcode.component';
const routes: Routes = [
  {path:'screen1',component:Screen1Component},
  {path:'screen2',component:Screen2Component},
  {path:'screen3',component:Screen3Component},
  {path:'screen4',component:Screen4Component},
  {path:'screen5',component:Screen5Component},
  {path:'screen6',component:Screen6Component},
  {path:'screen7',component:Screen7Component},
  {path:'dashboard',component:DashboardComponent},
  {path:'home',component:HomeComponent},
  {path:'multiselect',component:MultiSelectComponent},
  {path:'login',component:LoginComponent},
  {path:'screen-route',component:ScreenRouteComponent},
  {path:'sign-up',component:SignUpComponent},
  {path:'configuration',component:ConfigurationComponent},
  {path:'bulkupload',component:BulkuploadComponent},
  {path:'bulk-parent-child',component:BulkParentChildComponent},
  {path:'temperature',component:TemperatureComponent},
  {path:'qrcode',component:QRCodeComponent},
  {path:'bulkp',component:BulkParentChildComponent},


];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }