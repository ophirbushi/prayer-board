import { Component, OnInit, Input, ViewChild, TemplateRef } from '@angular/core';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { MatChipInputEvent, MatSnackBar, MatDialog } from '@angular/material';
import { BoardService } from 'src/app/shared/board.service';

@Component({
  selector: 'app-users-chip-list',
  templateUrl: './users-chip-list.component.html',
  styleUrls: ['./users-chip-list.component.scss']
})
export class UsersChipListComponent implements OnInit {
  @ViewChild('removeUserDialogTpl', { static: true }) removeUserDialogTpl: TemplateRef<any>;
  @Input() isAdmin: boolean;
  @Input() usernames: string[];
  @Input() boardId: string;
  usernameToBeRemoved: string;
  readonly chiplistSeperatorKeyCodes = [ENTER, COMMA];

  constructor(
    private boardService: BoardService,
    private snackbar: MatSnackBar,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
  }

  showRemoveUserDialog(index: number) {
    this.usernameToBeRemoved = this.usernames[index];
    this.dialog.open(this.removeUserDialogTpl);
  }

  async remove(username: string) {
    this.usernameToBeRemoved = null;
    try {
      await this.boardService.removeUserFromBoard({ boardId: this.boardId, username })
        .toPromise();
      const index = this.usernames.indexOf(username);
      this.usernames.splice(index, 1);
    } catch (err) {
      this.snackbar.open('An error occured', 'OK');
    }
  }

  async add(event: MatChipInputEvent) {
    const { input, value: username } = event;

    if ((username || '').trim()) {
      try {
        await this.boardService.addUserToBoard({ boardId: this.boardId, username })
          .toPromise();
        this.usernames.push(event.value);
        input.value = '';
      } catch (err) {
        if (err && err.status === 404) {
          this.snackbar.open('Could not find username "' + username + '"', 'OK');
        } else if (err && err.status === 409) {
          this.snackbar.open(`Username "${username}" already exists in board`, 'OK');
        } else {
          this.snackbar.open('An error occured', 'OK');
        }
      }
    }
  }
}
