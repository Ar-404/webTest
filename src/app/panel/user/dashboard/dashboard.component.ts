import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { FirebaseService } from 'src/app/shared/services/firebase.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  //#region variable

  public productList: Array<any> = [];
  public isLogged: boolean = false;
  public isVisible: boolean = false;
  public deleteItem: any;

  //#endregion

  //#region page load

  constructor(
    private router: Router,
    private _FirebaseService: FirebaseService,
    private _AuthService: AuthService
  ) { }

  ngOnInit(): void {
    this.isLogged = this._AuthService.loggedIn();
    if (this.isLogged) {
      this.isVisible = false;
    }else{
      this.isVisible = true;
    }
    this.getData();
  }

  //#endregion

  //#region public function

  public isLogout(e:boolean){
    this.isLogged = e;
    this.isVisible = true;
  }

  public details(id:string){
    this.router.navigate([`/home/product/details/${id}`]);
  }

  public setDeleteItem(product:any){
    this.deleteItem = product;
  }

  public delete(){
    this._FirebaseService.deleteDoc(this.deleteItem).then(()=>{
      this.getData();
    }).catch(err=>{
      console.log(err);
      
    })
  }

  //#endregion

  //#region private function

  private getData(){
    this._FirebaseService.getData().then(querySnapshot=>{
      this.productList = querySnapshot;
      
    }).catch(err=>{
      console.log(err);
      
    })
  }

  //#endregion


}
