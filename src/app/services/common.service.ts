import { Injectable } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app'; 
@Injectable()
export class CommonService {

  constructor(public af: AngularFireAuth, private formBuilder: FormBuilder) { }
  signInEmailAndPassword(data){  
    return this.af.auth.signInWithEmailAndPassword(data.email, data.password);
  }
  signupWithEmailPassword(data){
    return this.af.auth.createUserWithEmailAndPassword(data.email, data.password);
  }
  buildLoginFormService(){ 
    return this.formBuilder.group({
      email: ['', Validators.compose([
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(24),
      ]),      
    ],
    password: ['', Validators.required] 
    });
  }
  buildRegisterFormService() {
    return this.formBuilder.group({
      'createdby': [null, Validators.required],
      'fullname': [null, Validators.required],
      'maritialstatus': [null, Validators.required],      
      'gender': [null, Validators.required,],
      'dob': [{value: null, disabled: true}, Validators.required],   
      'country': [null, Validators.required],
      'state': [null, Validators.required],
      'city': [null, Validators.required],      
      'religion': [null, Validators.required],
      'mothertongue':  [null, Validators.required],
      'caste': [null, Validators.required],
      'email': [null, Validators.required],
      'mobile': [null, Validators.required],
      'password':[null, Validators.required]
    });
  }
}
