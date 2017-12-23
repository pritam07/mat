import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import {AngularFireDatabaseModule} from 'angularfire2/database'
import { appRouter } from './app.router';
import { MaterializeModule } from 'ng2-materialize';
import { Md2Module }  from 'md2'; 
import { environment } from '../environments/environment';
import { HomeComponent } from './home/home.component';
import { CommonComponent } from './common/common.component';

import {ApiService} from './services/api.service';
import {CommonService} from './services/common.service';
import { NgProgressModule } from '@ngx-progressbar/core';

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
    BrowserAnimationsModule,
    ReactiveFormsModule, 
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    MaterializeModule,
    Md2Module,
    NgProgressModule.forRoot(),
    appRouter,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [CommonService, ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
