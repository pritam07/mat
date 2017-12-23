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
  masterDataList: any; 
  errorMessageResources: any;
  constructor(private formBuilder: FormBuilder, public commonService: CommonService,
    private router: Router, public apiService: ApiService,
    public progressService: NgProgress) { }
  ngOnInit() {
    this.errorMessageResources = AppConstant.errorMessageResources;
    this.buildLoginForm();
    this.getMasterData();
    this.buildRegisterForm();
  }
  buildLoginForm() {
    this.loginForm = this.commonService.buildLoginFormService(); 
  }
  buildRegisterForm() {
    this.registerForm =  this.commonService.buildRegisterFormService(); 
  }
  getMasterData() {
    this.apiService.getFireStoeList('/masterdetails').subscribe(data => {
      this.progressService.done(); 
      this.masterDataList = data;    
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
}
