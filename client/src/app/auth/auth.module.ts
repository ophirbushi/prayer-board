import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthComponent } from './auth.component';
import { AuthService } from './auth.service';

@NgModule({
  declarations: [AuthComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [AuthService]
})
export class AuthModule { }
