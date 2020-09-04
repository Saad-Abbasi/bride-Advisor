import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NavHeaderComponent } from './constants/nav-header/nav-header.component';
import { MyFooterComponent } from './constants/my-footer/my-footer.component';
import { FindComponent } from './pages/find/find.component';
import { SupportComponent } from './pages/support/support.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { LeaveReviewComponent } from './pages/leave-review/leave-review.component';
import { PricingComponent } from './pages/pricing/pricing.component';
import { ListingComponent } from './pages/listing/listing.component';
import { AuthGuard } from './auth.guard';
import {ProfileComponent} from './pages/profile/profile.component'
import { ProfileViewComponent } from './pages/profile-view/profile-view.component';
import { SearchViewComponent } from './pages/search-view/search-view.component';
import { RatingDialogComponent } from './pages/dialogs/rating-dialog/rating-dialog.component';



const routes: Routes = [
  {path: 'nav-header', component : NavHeaderComponent},
  {path : 'footer', component : MyFooterComponent},
  {path : 'find', component : FindComponent},
  {path : 'support', component : SupportComponent},
  {path : 'signin', component : SignInComponent},
  {path : 'signup', component : SignUpComponent},
  {path : 'leave-review', component : LeaveReviewComponent,canActivate:[AuthGuard]},
  {path : 'pricing', component : PricingComponent},
  {path : 'listing', component : ListingComponent},
  {path : 'profile', component:ProfileComponent,canActivate:[AuthGuard]},
  {path : 'profile-view', component:ProfileViewComponent ,canActivate:[AuthGuard]},
  {path : 'search-view', component : SearchViewComponent},
  {path : 'review', component : LeaveReviewComponent,canActivate:[AuthGuard]},
  {path : '' , pathMatch : 'full' ,component:FindComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
