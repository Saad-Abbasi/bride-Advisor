import { NgModule } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import {LayoutModule} from '@angular/cdk/layout';
import {MatMenuModule} from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';
import {MatSelectModule} from '@angular/material/select';
import {MatCardModule} from '@angular/material/card';
import {MatDialogModule} from '@angular/material/dialog';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatTabsModule} from '@angular/material/tabs';
import {MatDividerModule} from '@angular/material/divider';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSnackBarModule} from '@angular/material/snack-bar';
// import {MatSnackBar} from '@angular/material/snack-bar'



const materialCompon = [
  MatButtonModule,
  MatSidenavModule,
  MatToolbarModule,
  MatIconModule,
  LayoutModule,
  MatListModule,
  MatMenuModule,
  MatSelectModule,
  MatCardModule,
  MatDialogModule,
  MatGridListModule,
  MatTooltipModule,
  MatTabsModule,
  MatDividerModule,
  MatProgressSpinnerModule,
  MatSnackBarModule
  // MatSnackBar


]

@NgModule({

  imports: [materialCompon],
  exports: [materialCompon]
})
export class MaterialModule { }
