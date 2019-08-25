import { Component, OnInit, ViewChild, TemplateRef, OnDestroy } from '@angular/core';
import { BoardService } from '../shared/board.service';
import { AppState } from '../app-state';
import { Observable, Subject } from 'rxjs';
import { User, Board } from '../shared/models';
import { ActivatedRoute, Router } from '@angular/router';
import { map, takeUntil, take } from 'rxjs/operators';
import { Toast } from '../shared/lib/toast/toast.service';
import { MatDialog, MatDialogRef } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';

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
    private toast: Toast,
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
      this.toast.show('An error occured', { type: 'error' });
    }
  }

  createBoardPopup() {
    const dialogRef = this.dialogRef = this.dialog.open(this.newBoardPopupTpl);

    dialogRef.beforeClosed().pipe(
      takeUntil(this.destroy),
      take(1)
    ).subscribe(() => this.newBoardForm.reset());
  }

}
