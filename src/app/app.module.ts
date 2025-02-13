import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {DateInputsModule} from '@progress/kendo-angular-dateinputs';

import { GridModule } from '@progress/kendo-angular-grid';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { ButtonsModule } from '@progress/kendo-angular-buttons'; 
import {TooltipModule} from '@progress/kendo-angular-tooltip'; 
import { DialogModule } from "@progress/kendo-angular-dialog";
//import { FormsModule } from '@angular/forms';

import { GaugesModule } from '@progress/kendo-angular-gauges';
import {NotificationModule} from '@progress/kendo-angular-notification';

import {UploadModule} from '@progress/kendo-angular-upload';

import { FileSelectModule } from '@progress/kendo-angular-upload';

import { HttpClientModule } from '@angular/common/http';
import { ChildComponentComponent } from './child-component/child-component.component';
import { NavbarComponent } from './navbar/navbar.component';
import { KendoComponentComponent } from './kendo-component/kendo-component.component';
@NgModule({
  declarations: [
    AppComponent,
    ChildComponentComponent,
    NavbarComponent,
    KendoComponentComponent 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DateInputsModule,
    BrowserAnimationsModule,
    GridModule,
    DropDownsModule,
    ButtonsModule,
    TooltipModule ,
    HttpClientModule,
    DialogModule,
    GaugesModule,
    NotificationModule,
    UploadModule,
    FileSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
