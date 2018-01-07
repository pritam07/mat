import { Component, OnInit } from '@angular/core';

import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {CommonService} from './../services/common.service';
import {ApiService} from './../services/api.service';
import {AppConstant} from './../app.constant';
import {NgProgress } from '@ngx-progressbar/core';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  loginForm: FormGroup; 
  registerForm: FormGroup;
  masterDataList: any = {}; 
  errorMessageResources: any;
  message: string;
  constructor(private formBuilder: FormBuilder, public commonService: CommonService,
    private router: Router, public apiService: ApiService,
    public progressService: NgProgress) { }
  ngOnInit() {
    this.errorMessageResources = AppConstant.errorMessageResources;
    //this.initService();
    this.buildLoginForm();
    this.getMasterData();
    this.buildRegisterForm();
  }
  buildLoginForm() {
    this.loginForm = this.commonService.buildLoginFormService(); 
  }
  buildRegisterForm() {
    this.registerForm = this.commonService.buildRegisterFormService(); 
  }
  getMasterData() {
    this.apiService.getFireStoeList('/masterdetails').subscribe(data => {
      this.progressService.done(); 
      let copyData: any = data;
      
      console.log('1'+1);
      console.log(copyData.filter(val => val.profilecreatedby));
      if(copyData.filter(val => val.profilecreatedby)) {
        this.masterDataList.profilecreatedby = copyData.filter(val => val.profilecreatedby)[0].profilecreatedby;   
      }
      if(copyData.filter(val => val.religion)) {
        this.masterDataList.religion = copyData.filter(val => val.religion)[0].religion;   
      }
      if(copyData.filter(val => val.mothertongue)) {
        this.masterDataList.mothertongue = copyData.filter(val => val.mothertongue)[0].mothertongue;   
      }
      if(copyData.filter(val => val.gender)) {
        this.masterDataList.gender = copyData.filter(val => val.gender)[0].gender;   
      }
        
      console.log(JSON.stringify(this.masterDataList));
    },    
    error => {     
      // handle/report the error
    }
  )
  }
  onSubmit(formData, isValid) {
    if(isValid) {          
      // this.commonService.signupWithEmailPassword(formData).then((user) => {
      //   alert('sign up');
      // })
      
      this.commonService.signInEmailAndPassword(formData)
      .then((user) => {      
        this.router.navigate(['/dashboard']);      
    }).catch((err) => {      
    
    });
    }
   
  }
  initService() {
    this.apiService.httpGetRequest('http://localhost:3000/users').subscribe(data => {
      this.message = JSON.parse(data._body).message;
      console.log(JSON.parse(data._body).message);
    })
  }
}
