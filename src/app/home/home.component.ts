import { Component, OnInit } from '@angular/core';

import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {CommonService} from './../services/common.service';
import {ApiService} from './../services/api.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  loginForm: FormGroup; 
  constructor(private formBuilder: FormBuilder, public commonService: CommonService,
    private router: Router, public apiService: ApiService) { }

  ngOnInit() {
    this.buildLoginForm();
  }
  buildLoginForm() {
    this.loginForm = this.commonService.buildLoginFormService(); 
  }
}
