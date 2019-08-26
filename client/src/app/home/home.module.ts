import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HomeResolve } from './home.resolve';
import { RouterModule } from '@angular/router';
import { MatButtonModule, MatListModule, MatCardModule, MatDialogModule, MatInputModule, MatIconModule, MatMenuModule } from '@angular/material';
import { BoardSettingsDialogComponent } from './board-settings-dialog/board-settings-dialog.component';

@NgModule({
  declarations: [HomeComponent, BoardSettingsDialogComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HomeRoutingModule,
    RouterModule,
    MatButtonModule,
    MatListModule,
    MatCardModule,
    MatDialogModule,
    MatInputModule,
    MatIconModule,
    MatMenuModule
  ],
  providers: [HomeResolve],
  entryComponents: [BoardSettingsDialogComponent]
})
export class HomeModule { }
