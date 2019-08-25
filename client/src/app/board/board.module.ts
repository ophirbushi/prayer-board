import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardComponent } from './board.component';
import { BoardRoutingModule } from './board-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatChipsModule, MatButtonModule, MatIconModule, MatDialogModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule } from '@angular/material';
import { PrayerRequestsTableComponent } from './prayer-requests-table/prayer-requests-table.component';



@NgModule({
  declarations: [BoardComponent, PrayerRequestsTableComponent],
  imports: [
    CommonModule,
    BoardRoutingModule,
    ReactiveFormsModule,
    MatChipsModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule
  ]
})
export class BoardModule { }
