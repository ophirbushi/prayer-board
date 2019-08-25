import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-prayer-requests-table',
  templateUrl: './prayer-requests-table.component.html',
  styleUrls: ['./prayer-requests-table.component.scss']
})
export class PrayerRequestsTableComponent implements OnInit {
  @Input() userId: string;
  @Input() dataSource = [];
  @Output() deleteClick = new EventEmitter<number>();
  displayedColumns: string[] = ['username', 'title', 'description', 'actions'];

  constructor() { }

  ngOnInit() {

  }

  onDeleteClick(index: number) {
    this.deleteClick.emit(index);
  }

}
