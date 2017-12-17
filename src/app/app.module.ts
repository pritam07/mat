import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { ServiceWorkerModule } from '@angular/service-worker';
import { AppComponent } from './app.component';

import { appRouter } from './app.router';
import { environment } from '../environments/environment';
import { HomeComponent } from './home/home.component';
import { CommonComponent } from './common/common.component';

@NgModule({
  declarations: [
    AppComponent,  
    HomeComponent,
    CommonComponent
  ],
  imports: [
    BrowserModule,
    appRouter,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
