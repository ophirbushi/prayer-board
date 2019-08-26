import { Component, OnInit, ViewChild, TemplateRef, OnDestroy } from '@angular/core';
import { BoardService } from '../shared/board.service';
import { AppState } from '../app-state';
import { Observable, Subject } from 'rxjs';
import { User, Board } from '../shared/models';
import { ActivatedRoute, Router } from '@angular/router';
import { map, takeUntil, take } from 'rxjs/operators';
import { MatDialog, MatDialogRef, MatSnackBar } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BoardSettingsDialogComponent } from './board-settings-dialog/board-settings-dialog.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  @ViewChild('newBoardPopupTpl', { static: true }) newBoardPopupTpl: TemplateRef<any>;
  user$: Observable<User> = this.state.select('user');
  boards$: Observable<Board[]>;
  newBoardForm = new FormGroup({
    boardName: new FormControl(null, Validators.required)
  });
  private dialogRef: MatDialogRef<any>;
  private destroy = new Subject();

  constructor(private boardService: BoardService,
    private state: AppState,
    private route: ActivatedRoute,
    private router: Router,
    private snackbar: MatSnackBar,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.boards$ = this.route.data.pipe(map(data => data.user.boards));
  }

  ngOnDestroy() {
    this.destroy.next();
    this.destroy.complete();
  }

  async addBoard() {
    const user = this.state.get('user');
    try {
      const { boardName } = this.newBoardForm.value;
      const board = await this.boardService.createBoard({ userId: user._id, boardName })
        .toPromise();
      if (this.dialogRef) {
        this.dialogRef.close();
      }
      this.router.navigate(['/board', board._id]);
    } catch (err) {
      this.snackbar.open('An error occured', 'OK', { duration: 4000 });
    }
  }

  createBoardPopup() {
    const dialogRef = this.dialogRef = this.dialog.open(this.newBoardPopupTpl);

    dialogRef.beforeClosed().pipe(
      takeUntil(this.destroy),
      take(1)
    ).subscribe(() => this.newBoardForm.reset());
  }

  onBoardSettingsClick(event: MouseEvent) {
    event.stopPropagation();
    event.preventDefault();
  }

}
