import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardComponent } from './board.component';
import { BoardRoutingModule } from './board-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
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
