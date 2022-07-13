import { Injectable } from '@angular/core';
import { CanActivate, Router} from '@angular/router';
import { AuthService } from '../shared/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class GuardGuard implements CanActivate {
  
  //#region variable

  //#endregion

  //#region page load

  constructor(
    private _AuthService: AuthService,
    private _Router: Router
    ){
    
  }

  //#endregion

  //#region can active

  canActivate(): boolean  {
    if (this._AuthService.loggedIn()) {
      return true;
    }else{
      this._Router.navigate(['/auth']);
      return false;
    }
      
  }

  //#endregion
  
}
