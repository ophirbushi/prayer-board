import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HomeResolve } from './home.resolve';
import { RouterModule } from '@angular/router';
import { MatButtonModule, MatListModule, MatCardModule, MatDialogModule, MatInputModule } from '@angular/material';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HomeRoutingModule,
    RouterModule,
    MatButtonModule,
    MatListModule,
    MatCardModule,
    MatDialogModule,
    MatInputModule
  ],
  providers: [HomeResolve]
})
export class HomeModule { }
