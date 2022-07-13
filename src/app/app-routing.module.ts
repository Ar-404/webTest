import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GuardGuard } from './auth/guard.guard';
import { ErrorComponent } from './error/error.component';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch:'full'},
  {path: 'home', loadChildren: ()=>import('./panel/user/user.module').then(m=>m.UserModule)},
  {path: 'Admin', loadChildren: ()=>import('./panel/admin/admin.module').then(m=>m.AdminModule), canActivate: [GuardGuard]},
  {path: 'auth', loadChildren: ()=>import('./auth/auth.module').then(m=>m.AuthModule)},
  {path: '**', component: ErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
