import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavHeaderComponent } from './constants/nav-header/nav-header.component';
import { MyFooterComponent } from './constants/my-footer/my-footer.component';
import { FindComponent } from './pages/find/find.component';
import { SupportComponent } from './pages/support/support.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { LeaveReviewComponent } from './pages/leave-review/leave-review.component';

@NgModule({
  declarations: [
    AppComponent,
    NavHeaderComponent,
    MyFooterComponent,
    FindComponent,
    SupportComponent,
    SignInComponent,
    SignUpComponent,
    LeaveReviewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
