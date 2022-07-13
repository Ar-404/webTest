import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FirebaseService } from '../../services/firebase.service';
import { faFilm } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-header-comp',
  templateUrl: './header-comp.component.html',
  styleUrls: ['./header-comp.component.css']
})
export class HeaderCompComponent implements OnInit {

  //#region variable
    public isLogged: boolean = false;
    @Input() isVisible: boolean = false;
    @Output() isLogout: EventEmitter<any> = new EventEmitter;
  //#endregion
  
  //#region pageload

    constructor(
      private router: Router,
      private _FirebaseService: FirebaseService,
      private _AuthService: AuthService
    ) { 
      this.isLogged = this._AuthService.loggedIn();
    }

    ngOnInit(): void {
    }

  //#endregion

  //#region public function

  public loginPage(){
    this.router.navigate(['/auth/']);
  }

  public logOut(){
    this._FirebaseService.logOut();
    this._AuthService.loggOut();
    this.isLogged = this._AuthService.loggedIn();
    this.isLogout.emit(this.isLogged);
  }

  public addProduct(){
    this.router.navigate(['/home/product/']);
  }

  //#endregion

}
