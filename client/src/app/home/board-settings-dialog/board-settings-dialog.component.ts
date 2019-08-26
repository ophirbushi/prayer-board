import { Component, OnInit, Inject } from '@angular/core';
import { User, Board } from 'src/app/shared/models';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-board-settings-dialog',
  templateUrl: './board-settings-dialog.component.html',
  styleUrls: ['./board-settings-dialog.component.scss']
})
export class BoardSettingsDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: { board: Board, user: User }) { }

  ngOnInit() {
  }

}
