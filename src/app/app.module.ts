import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule,HTTP_INTERCEPTORS} from '@angular/common/http'
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from "@angular/flex-layout";
import {ReactiveFormsModule,FormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavHeaderComponent } from './constants/nav-header/nav-header.component';
import { MyFooterComponent } from './constants/my-footer/my-footer.component';
import { FindComponent } from './pages/find/find.component';
import { SupportComponent } from './pages/support/support.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { LeaveReviewComponent } from './pages/leave-review/leave-review.component';
import { PricingComponent } from './pages/pricing/pricing.component';
import {LoginService} from './shared/login/login.service'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MaterialModule} from './material/material.module';
import { SideNavComponent } from './constants/side-nav/side-nav.component';
import { ListingComponent } from './pages/listing/listing.component';
import {AuthGuard} from './auth.guard'
import {TokenInterceptorService}from '../app/shared/token-interceptor.service';
import { ProfileComponent } from './pages/profile/profile.component';
import { ProfileImgComponent } from './pages/dialogs/profile-img/profile-img.component';
import { GalleryComponent } from './pages/dialogs/gallery/gallery.component';
import { ProfileViewComponent } from './pages/profile-view/profile-view.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { ImageDialogeComponent } from './pages/dialogs/image-dialoge/image-dialoge.component';
import { SearchViewComponent } from './pages/search-view/search-view.component';
import { RatingDialogComponent } from './pages/dialogs/rating-dialog/rating-dialog.component';
import { StripPaymentComponent } from './pages/dialogs/strip-payment/strip-payment.component';
import { TermsConditionComponent } from './pages/terms-condition/terms-condition.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { UpdatePasswordComponent } from './pages/update-password/update-password.component';
import { DashboardComponent } from './pages/dashboard/dashboard/dashboard.component';
import { NavHeaderAdminComponent } from './constants/nav-header-admin/nav-header-admin.component';
import { ViewListingsComponent } from './pages/dashboard/listing/view-listings/view-listings.component';
import { ViewReviewsComponent } from './pages/dashboard/view-reviews/view-reviews.component';
import { ViewUsersComponent } from './pages/dashboard/view-users/view-users.component';
import { EditListingDialogComponent } from './pages/dashboard/dialogues/edit-listing-dialog/edit-listing-dialog.component';
import { ConfirmDialogComponent } from './pages/dashboard/dialogues/confirm-dialog/confirm-dialog.component';
import {ResolverService} from '../app/shared/resolver/resolver.service';
import { GooglePlaceModule } from "ngx-google-places-autocomplete";
import { AddUserDialogComponent } from './pages/dashboard/dialogues/add-user-dialog/add-user-dialog.component';




@NgModule({
  declarations: [
    AppComponent,
    NavHeaderComponent,
    MyFooterComponent,
    FindComponent,
    SupportComponent,
    SignInComponent,
    SignUpComponent,
    LeaveReviewComponent,
    PricingComponent,
    SideNavComponent,
    ListingComponent,
    ProfileComponent,
    ProfileImgComponent,
    GalleryComponent,
    ProfileViewComponent,
    ImageDialogeComponent,
    SearchViewComponent,
    RatingDialogComponent,
    StripPaymentComponent,
    TermsConditionComponent,
    ForgotPasswordComponent,
    UpdatePasswordComponent,
    DashboardComponent,
    NavHeaderAdminComponent,
    ViewListingsComponent,
    ViewReviewsComponent,
    ViewUsersComponent,
    EditListingDialogComponent,
    ConfirmDialogComponent,
    AddUserDialogComponent
    
   
  ],
  entryComponents:[
    ProfileImgComponent,
    GalleryComponent,
    ImageDialogeComponent,
    StripPaymentComponent,
    EditListingDialogComponent,
    ConfirmDialogComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    CarouselModule,
    GooglePlaceModule
    
  ],
  providers: [LoginService,ResolverService,AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass:TokenInterceptorService,
      
      multi:true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
