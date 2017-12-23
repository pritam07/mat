import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import {MzToastService} from 'ng2-materialize';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import {NgProgress } from '@ngx-progressbar/core';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from 'angularfire2/firestore'
@Injectable()
export class ApiService {

  constructor(public afDb: AngularFireDatabase, private toastService: MzToastService,
    public progressService: NgProgress, private afs: AngularFirestore) { } 
  getFirebaseObjectObservable(path) {
    this.progressService.start();    
    let getObjObservable = this.afDb.object(path).valueChanges().map(data => data).catch(err => { return Observable.of(this.showError());});
    getObjObservable.subscribe(
      data => { this.progressService.done(); console.log(data); }
     )
     return getObjObservable;
    //return this.afDb.object(path).valueChanges().map(data => data).catch(err => { return Observable.of(this.showError())}).subscribe(() => { return this.progressService.start();});
  }
  getFirebaseListObservable(path) {
    this.progressService.start();
    return this.afDb.list(path).valueChanges().map(data => data).catch(err => { return Observable.of(this.showError())});
  }
  showError() {
    this.toastService.show('Server is not responding', 4000, 'black');  
  }
  getFireStoeList(path){
    this.progressService.start(); 
    return this.afs.collection(path).valueChanges().map(data => data).catch(err => { return Observable.of(this.showError());});
  }
}
