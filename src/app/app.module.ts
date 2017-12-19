import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { ServiceWorkerModule } from '@angular/service-worker';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from 'angularfire2';
import { appRouter } from './app.router';
import { MaterializeModule } from 'ng2-materialize';
import { Md2Module }  from 'md2'; 
import { environment } from '../environments/environment';
import { HomeComponent } from './home/home.component';
import { CommonComponent } from './common/common.component';

import {ApiService} from './services/api.service';
import {CommonService} from './services/common.service';

export const firebaseConfig = {
  apiKey: "AIzaSyDOC4RkRcduJRUcswEfjjvDvtJ-tnPZeno",
  authDomain: "matapp-e8a3c.firebaseapp.com",
  databaseURL: "https://matapp-e8a3c.firebaseio.com",
  projectId: "matapp-e8a3c",
  storageBucket: "matapp-e8a3c.appspot.com",
  messagingSenderId: "484477005802"
};

@NgModule({
  declarations: [
    AppComponent,  
    HomeComponent,
    CommonComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule, 
    AngularFireModule.initializeApp(firebaseConfig),
    MaterializeModule,
    Md2Module,
    appRouter,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [CommonService, ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
