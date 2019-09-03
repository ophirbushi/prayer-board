import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';

@Component({
  selector: 'app-prayer-requests-table',
  templateUrl: './prayer-requests-table.component.html',
  styleUrls: ['./prayer-requests-table.component.scss']
})
export class PrayerRequestsTableComponent implements OnInit {
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @Input() userId: string;
  private _prayerRequests = [];
  get prayerRequests(): any[] { return this._prayerRequests; }
  @Input() set prayerRequests(value: any[]) {
    this._prayerRequests = value;
    this.dataSource.data = value;
  }
  dataSource = new MatTableDataSource(this._prayerRequests);
  @Output() deleteClick = new EventEmitter<number>();
  @Output() prayingClick = new EventEmitter<number>();
  displayedColumns: string[] = ['username', 'title', 'description', 'actions'];
  requestsThatUserHasAlreadyClickedOnPrayingButton: { [id: string]: boolean } = {};

  constructor() { }

  ngOnInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  onDeleteClick(index: number) {
    this.deleteClick.emit(index);
  }

  onPrayingClick(index: number) {
    this.prayingClick.emit(index);
    if (this.prayerRequests[index]) {
      this.requestsThatUserHasAlreadyClickedOnPrayingButton[this.prayerRequests[index]._id] = true;
    }
  }

}
