// app.module.ts

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import {OpenPageComponent} from "./pages/open-page/open-page.component";
import {HttpClientModule} from "@angular/common/http";
import {ConnectionServiceModule} from 'ng-connection-service';

@NgModule({
  declarations: [

    // Add other components, directives, and pipes here
  ],
  imports: [
    BrowserModule,
    AppComponent,
    OpenPageComponent,
    HttpClientModule,
    ConnectionServiceModule
    // Import the AppRoutingModule
    // Add other modules your application depends on here
  ],
  providers: [],
})
export class AppModule { }
