import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/shared/services/firebase.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  //#region variable

  public loginForm!: FormGroup<any>;
  public isVisible: boolean = false;
  public isWrongPassEmail: boolean = false;

  //#endregion

  //#region page load

  constructor(
    private _fb: FormBuilder,
    private _FirebaseService: FirebaseService,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this.loginForm = this._fb.group({
      email: [''],
      password: ['']
    });
  }

  //#endregion
  
  //#region public function

  public submit(){
    this.callsignInService(this.loginForm?.value)
  }

  public signup(){
    this._router.navigate(['/auth/signup']);
  }

  //#endregion

  //#region service call

  private callsignInService(value:any){
    this._FirebaseService.signIn(value).then((data)=>{
      this._router.navigate(['/home']);
    }).catch(err=>{
      this.isWrongPassEmail = true;
    });
  }

  //#endregion
  

}
