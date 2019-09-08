import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardComponent } from './board.component';
import { BoardRoutingModule } from './board-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatChipsModule, MatButtonModule, MatIconModule, MatDialogModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule, MatAutocompleteModule, MatCardModule } from '@angular/material';
import { PrayerRequestsTableComponent } from './prayer-requests-table/prayer-requests-table.component';
import { UsersChipListComponent } from './users-chip-list/users-chip-list.component';
import { PrayerRequestComponent } from './prayer-request/prayer-request.component';

@NgModule({
  declarations: [BoardComponent, PrayerRequestsTableComponent, UsersChipListComponent, PrayerRequestComponent],
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
    MatPaginatorModule,
    MatAutocompleteModule,
    MatCardModule
  ]
})
export class BoardModule { }
