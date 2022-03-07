import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule} from '@angular/forms'
import { DatePipe } from "@angular/common";
import { AppRoutingModule,routingComponents } from './app-routing.module';

import { AppComponent } from './app.component';
import { CRUDFormComponent } from './data-test/crud-form/crud-form.component';
import { HttpClientModule } from '@angular/common/http';
import { MainComponent } from './MainPage/main/main.component';

@NgModule({
  declarations: [
    AppComponent,
    CRUDFormComponent,
    routingComponents,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
