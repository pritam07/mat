import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import {MzToastService} from 'ng2-materialize';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import {NgProgress } from '@ngx-progressbar/core';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from 'angularfire2/firestore'
import {Http, XHRBackend, ConnectionBackend, RequestOptions, Request, RequestOptionsArgs, Response, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/finally';
import "rxjs/add/operator/toPromise";
import "rxjs/add/operator/switchMap";
@Injectable()
export class ApiService {

  constructor(public afDb: AngularFireDatabase, private toastService: MzToastService,
    public progressService: NgProgress, private afs: AngularFirestore, private http: Http) { } 
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
  getFireStoeList(collectionPath, documentPath?){
    this.progressService.start(); 
    return documentPath ? this.afs.collection(collectionPath).doc(documentPath).valueChanges().map(data => data).catch(err => { return Observable.of(this.showError());}) : this.afs.collection(collectionPath).valueChanges().map(data => data).catch(err => { return Observable.of(this.showError());});
  }
  httpGetRequest(url: string, options?: RequestOptionsArgs): any {
    let headerObj = new Headers({
      'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Ing0Nzh4eU9wbHNNMUg3TlhrN1N4MTd4MXVwYyIsImtpZCI6Ing0Nzh4eU9wbHNNMUg3TlhrN1N4MTd4MXVwYyJ9.eyJhdWQiOiJodHRwczovL25tZm50ZXN0Lm9ubWljcm9zb2Z0LmNvbS9iZWIyYzM2Yi01ZGNhLTQxZGQtODhmNi1kNGYxYWQ5ZTQ0ZmYiLCJpc3MiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC82ZWRkZDE4NS03YWQ3LTRlZTMtOTQ4MS0wNDY0NGI5ZjQzYTIvIiwiaWF0IjoxNTE0OTU0ODk4LCJuYmYiOjE1MTQ5NTQ4OTgsImV4cCI6MTUxNDk1ODc5OCwiYWNyIjoiMSIsImFpbyI6IlkyTmdZSERRVWpFVTFkajNUbWV0WTVOSkZ0ZXNySjUxV3dYMi9MYWNlOXA5cy9EL0tsMEEiLCJhbXIiOlsid2lhIl0sImFwcGlkIjoiNDQ0MmRlMmUtZjA2My00YmUxLTkxMGYtNTg4MmJjZTk0NjI3IiwiYXBwaWRhY3IiOiIwIiwiZV9leHAiOjI2MjgwMCwiZmFtaWx5X25hbWUiOiJOQUxMQU1JTExJIiwiZ2l2ZW5fbmFtZSI6IlNBVFlBTUFMTElLQVJKVU4iLCJpbl9jb3JwIjoidHJ1ZSIsImlwYWRkciI6IjIxNi4yMC4xNzYuMSIsIm5hbWUiOiJOQUxMQU1JTExJLCBTQVRZQU1BTExJS0FSSlVOIiwib2lkIjoiZmIzNDVmYjYtNjNkNC00ZTBhLThjYzEtODRmM2ZiM2U1OTAzIiwib25wcmVtX3NpZCI6IlMtMS01LTIxLTEzNjM4ODIwMjAtMzA3NjQ1NjYwOC0yMjgwMDY2MDYyLTEwMzMzMjc2Iiwic2NwIjoidXNlcl9pbXBlcnNvbmF0aW9uIiwic3ViIjoidjVwX0pqbHU2NE95VDRyMzdGeEtPU3dtY04yeElWX2c4MzhlWFZWZmptcyIsInRpZCI6IjZlZGRkMTg1LTdhZDctNGVlMy05NDgxLTA0NjQ0YjlmNDNhMiIsInVuaXF1ZV9uYW1lIjoic2F0eWFtYWxsaWthcmp1bm5hbGxhbWlsbGlAbm1jb3AuY29tIiwidXBuIjoic2F0eWFtYWxsaWthcmp1bm5hbGxhbWlsbGlAbm1jb3AuY29tIiwidXRpIjoieDFFbnlaVHpSa2U5ZkJIMXBWZ2RBQSIsInZlciI6IjEuMCJ9.s3br05_9kqL-DX8uBcZjlBlQWL2mjZEjRNjxWKCR92cSp8KaJANhPrMk2UGRYaCERZLkqQzCMYR2N_6YeTPOOxOF4-9Mc6dH1KWaeTcUUvwilnjCq_U-jjqobzxIxNS3XYsCMpdFVut9XBasAjCaBxq4jh2hpywior9hPM57xTH9DcswBYSJ5WW3VqJ9Ngw34T7XTfujFWnkWjTeUon434bYvwWyKPV9j-Gb7CnpMXf0bh0n_Cnh3p7oG_RwvnuSCdAjXyho6Qhfn1lSrgmwqWBoG9Vf654hR7OEuwiGHVFhCrtpzAuWN6esewIZkkqo-hI6AqOt7aIoDZ_DA0DVLw'
    });
    this.progressService.start(); 
    console.log('get...');    
    return this.http.get(url, {headers: headerObj})
    .finally(() => {
      this.progressService.done();
    });
  }
}
