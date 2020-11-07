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
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input'
// import {MatSnackBar} from '@angular/material/snack-bar'



const materialCompon = [
  MatButtonModule,
  MatInputModule,
  MatSidenavModule,
  MatToolbarModule,
  MatIconModule,
  LayoutModule,
  MatPaginatorModule,
  MatTableModule,
  MatListModule,
  MatMenuModule,
  MatSelectModule,
  MatCardModule,
  MatDialogModule,
  MatSortModule,
  MatGridListModule,
  MatTooltipModule,
  MatTabsModule,
  MatDividerModule,
  MatProgressSpinnerModule,
  MatSnackBarModule,
  MatFormFieldModule
  // MatSnackBar


]

@NgModule({

  imports: [materialCompon],
  exports: [materialCompon]
})
export class MaterialModule { }
