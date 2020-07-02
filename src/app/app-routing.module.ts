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


const routes: Routes = [
  {path: 'nav-header', component : NavHeaderComponent},
  {path : 'footer', component : MyFooterComponent},
  {path : 'find', component : FindComponent},
  {path : 'support', component : SupportComponent},
  {path : 'signin', component : SignInComponent},
  {path : 'signup', component : SignUpComponent},
  {path : 'leave-review', component : LeaveReviewComponent},
  {path : 'pricing', component : PricingComponent},
  {path : '' , pathMatch : 'full' ,component:FindComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
