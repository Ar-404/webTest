import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderCompComponent } from '../header-comp/header-comp.component';
import { FooterCompComponent } from '../footer-comp/footer-comp.component';



@NgModule({
  declarations: [HeaderCompComponent, FooterCompComponent],
  imports: [
    CommonModule
  ],
  exports: [HeaderCompComponent, FooterCompComponent]
})
export class ShareModule { }
