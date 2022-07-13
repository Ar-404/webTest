import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { FirebaseService } from 'src/app/shared/services/firebase.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  //#region variable

  private _filePath: string = '';
  private _file: any;
  private _productDetails: any;
  private _productId: string = '';
  private _isEditImage:boolean = false;
  private _prevImagePath:string = '';

  public productForm!: FormGroup<any>;
  public isVisible: boolean = false;
  public isEdit: boolean = false;
  public isLoding: boolean = false;

  //#endregion
  
  //#region pageload

  constructor(
    private router: Router,
    private activeRouter: ActivatedRoute,
    private fb: FormBuilder,
    private _FirebaseService: FirebaseService
  ) {
    let id = this.activeRouter.snapshot.params['id'];
    this._productId = id;
  }

  ngOnInit(): void {
    this.productForm = this.fb.group({
      productName: [''],
      productPrice: [''],
      productOffer: [''],
      fileName: [''],
      filePath: [''],
      imageUrl: ['']
    });

    if (this._productId ) {
      this.isEdit = true;
      this._FirebaseService.getDoc(this._productId).then(data => {
        this._productDetails = data;
        this.productForm.controls['productName'].setValue(this._productDetails.productName);
        this.productForm.controls['productPrice'].setValue(this._productDetails.productPrice);
        this.productForm.controls['productOffer'].setValue(this._productDetails.productOffer);
        this.productForm.controls['fileName'].setValue(this._productDetails.fileName);
        this.productForm.controls['filePath'].setValue(this._productDetails.filePath);
        this.productForm.controls['imageUrl'].setValue(this._productDetails.imageUrl);
        this._prevImagePath = this._productDetails.filePath;
      }).catch(err => {
        console.log(err);

      })
    }
  }

  //#endregion

  //#region public function

  public uploadImage(event: any) {
    let n = Date.now();
    this._file = event.target.files[0];
    this._filePath = `productImages/${n}${this._file.name}`;
    this._isEditImage = true;
  }

  public delete() {
    // this.router.navigate(['/Home']);
    this._FirebaseService.deleteImage(this._prevImagePath);
  }

  public add() {
    this.isLoding = true;
    this._FirebaseService.uploadImage(this._file, this._filePath).then(url => {
      this.productForm.controls['fileName'].setValue(this._file.name);
      this.productForm.controls['filePath'].setValue(this._filePath);
      this.productForm.controls['imageUrl'].setValue(url);
      this.addProduct(this.productForm?.value);
    }).catch(err => {
      console.log(err);
    });
  }

  public edit(){
    this.isLoding = true;
    if (this._isEditImage) {
      this.delete();
      this._FirebaseService.uploadImage(this._file, this._filePath).then(url => {
        this.productForm.controls['fileName'].setValue(this._file.name);
        this.productForm.controls['filePath'].setValue(this._filePath);
        this.productForm.controls['imageUrl'].setValue(url);

        this.updateData(this.productForm.value)
      }).catch(err => {
        console.log(err);
      });
    }else{
      this.updateData(this.productForm.value)
    }
    
  }

  //#endregion

  //#region call service

  private updateData(value:any){
    this._FirebaseService.updateData(value, this._productId).then((data)=>{
      this.router.navigate(['/home']);
      this.isLoding = false;
    }).catch(err=>{
      console.log(err);
      
    })
  }

  private addProduct(value:any){
    this._FirebaseService.addProduct(value).then(() => {
      this.router.navigate(['/home']);
      this.isLoding = false;
    })
  }

  //#endregion
}
