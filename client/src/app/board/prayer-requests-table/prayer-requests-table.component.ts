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
  private _requests = [];
  get requests(): any[] { return this._requests; }
  @Input() set requests(value: any[]) {
    this._requests = value;
    this.dataSource.data = value;
  }
  dataSource = new MatTableDataSource(this._requests);
  @Output() deleteClick = new EventEmitter<number>();
  @Output() prayingClick = new EventEmitter<number>();
  displayedColumns: string[] = ['username', 'title', 'description', 'actions'];

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
  }

}
