import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { FormsModule } from '@angular/forms';
import { HomeResolve } from './home.resolve';
import { RouterModule } from '@angular/router';
import { MatButtonModule, MatListModule, MatCardModule } from '@angular/material';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    FormsModule,
    HomeRoutingModule,
    RouterModule,
    MatButtonModule,
    MatListModule,
    MatCardModule
  ],
  providers: [HomeResolve]
})
export class HomeModule { }
