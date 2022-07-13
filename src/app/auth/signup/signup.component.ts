import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/shared/services/firebase.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  //#region variable

  public registrationForm!: FormGroup<any>;
  public isVisible: boolean =  false;

  //#endregion
  
  //#region page load

  constructor(
    private _fb: FormBuilder,
    private _FirebaseService: FirebaseService,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this.registrationForm = this._fb.group({
      name: [''],
      email: [''],
      password: ['']
    });
  }

  //#endregion
  

  //#region public function

  get f() {
    return this.registrationForm.controls;
  }

  public submit(){
    this.signUp(this.registrationForm?.value);
  }
  
  //#endregion

  //#region call service

  private signUp(formData: any){
    this._FirebaseService.signUp(formData).then((data)=>{
      this._router.navigate(['/home']);
    }).catch((err)=>{
      console.log(err);
      
    })
  }

  //#endregion
}
