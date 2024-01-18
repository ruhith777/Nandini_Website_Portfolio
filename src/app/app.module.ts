import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Screen1Component } from './screen1/screen1.component';
import { TrimDirective } from './trim.directive';
import { Screen2Component } from './screen2/screen2.component';
import { DatePipe } from '@angular/common';
import { Task1Service } from './task1.service';
import { DataTablesModule } from 'angular-datatables';
import { Screen3Component } from './screen3/screen3.component';
import { Screen4Component } from './screen4/screen4.component';
import { Screen5Component } from './screen5/screen5.component';
import { Screen6Component } from './screen6/screen6.component';
import { Screen7Component } from './screen7/screen7.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { MultiSelectComponent } from './multi-select/multi-select.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { LoginComponent } from './login/login.component';
import { ScreenRouteComponent } from './screen-route/screen-route.component';
import { RouterModule, Router } from '@angular/router';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ConfigurationComponent } from './configuration/configuration.component';
import { BulkuploadComponent } from './bulkupload/bulkupload.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BulkParentChildComponent } from './bulk-parent-child/bulk-parent-child.component';
import { TemperatureComponent } from './temperature/temperature.component';
import { QRCodeComponent } from './qrcode/qrcode.component';
import {QRCodeModule} from 'angularx-qrcode';
import { SearchComponent } from './search/search.component';
import { MatTabsModule } from '@angular/material/tabs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatStepperModule} from '@angular/material/stepper';
import {MatButtonModule} from '@angular/material/button';
import { PPPComponent } from './ppp/ppp.component';
@NgModule({
  declarations: [
    AppComponent,
    Screen1Component,
    TrimDirective,
    Screen1Component,
    Screen2Component,
    Screen3Component, 
    Screen4Component,
    Screen5Component,
    Screen6Component,
    Screen7Component,
    DashboardComponent,
    HomeComponent,
    MultiSelectComponent,
    LoginComponent, 
    ScreenRouteComponent, 
    SignUpComponent,
    ConfigurationComponent, 
    BulkuploadComponent, BulkParentChildComponent, TemperatureComponent, QRCodeComponent, SearchComponent, PPPComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    DatePipe,
    DataTablesModule,
    NgMultiSelectDropDownModule,
    MatSlideToggleModule,
    RouterModule,
    MatProgressSpinnerModule,
    QRCodeModule,
    MatTabsModule,
    BrowserAnimationsModule,
    MatTabsModule,
     MatIconModule,
     MatButtonModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule
    
    // CKEditorModule,
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
