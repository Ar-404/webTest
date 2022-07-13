import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GuardGuard } from 'src/app/auth/guard.guard';
import { DashboardComponent } from '../user/dashboard/dashboard.component';
import { ProductDetailsComponent } from './product-details/product-details.component';

const routes: Routes = [
  {path:'', component: DashboardComponent},
  {path:'product', component: ProductDetailsComponent, canActivate: [GuardGuard]},
  {path:'product/details/:id', component: ProductDetailsComponent, canActivate: [GuardGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
