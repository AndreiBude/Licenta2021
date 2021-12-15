import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule} from '@angular/forms'
import { DatePipe } from "@angular/common";

import { AppComponent } from './app.component';
import { DataTestComponent } from './data-test/data-test.component';
import { CRUDFormComponent } from './data-test/crud-form/crud-form.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    DataTestComponent,
    CRUDFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
