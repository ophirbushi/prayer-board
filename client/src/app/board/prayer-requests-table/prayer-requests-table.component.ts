import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-prayer-requests-table',
  templateUrl: './prayer-requests-table.component.html',
  styleUrls: ['./prayer-requests-table.component.scss']
})
export class PrayerRequestsTableComponent implements OnInit {
  @Input() userId: string;
  private _requests = [];
  get requests(): any[] { return this._requests; }
  @Input() set requests(value: any[]) {
    this._requests = value;
    this.dataSource.data = value;
  }
  dataSource = new MatTableDataSource(this._requests);
  @Output() deleteClick = new EventEmitter<number>();
  displayedColumns: string[] = ['username', 'title', 'description', 'actions'];

  constructor() { }

  ngOnInit() {

  }

  onDeleteClick(index: number) {
    this.deleteClick.emit(index);
  }

}
