import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ErrorComponent } from './error/error.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FirebaseService } from './shared/services/firebase.service';
import { GuardGuard } from './auth/guard.guard';
import { ShareModule } from './shared/components/share/share.module';


@NgModule({
  declarations: [
    AppComponent,
    ErrorComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ShareModule
  ],
  providers: [FirebaseService, GuardGuard],
  bootstrap: [AppComponent],
  exports: [ShareModule]
})
export class AppModule { }
