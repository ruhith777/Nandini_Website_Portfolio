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
import { CommonpopupComponent } from './commonpopup/commonpopup.component';
import { Screen5Component } from './screen5/screen5.component';
import { Screen6Component } from './screen6/screen6.component';
import { Screen7Component } from './screen7/screen7.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

@NgModule({
  declarations: [
    AppComponent,
    Screen1Component,
    TrimDirective,
    Screen1Component,
    Screen2Component,
    Screen3Component, 
    Screen4Component,
    CommonpopupComponent,
    Screen5Component,
    Screen6Component,
    Screen7Component,
    DashboardComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    DatePipe,
    DataTablesModule,
    CKEditorModule,
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
