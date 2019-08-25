import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardComponent } from './board.component';
import { BoardRoutingModule } from './board-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatChipsModule, MatButtonModule, MatIconModule, MatDialogModule, MatInputModule } from '@angular/material';



@NgModule({
  declarations: [BoardComponent],
  imports: [
    CommonModule,
    BoardRoutingModule,
    ReactiveFormsModule,
    MatChipsModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatInputModule
  ]
})
export class BoardModule { }
