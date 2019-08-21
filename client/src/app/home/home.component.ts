import { Component, OnInit } from '@angular/core';
import { BoardService } from '../shared/board.service';
import { AppState } from '../app-state';
import { Observable } from 'rxjs';
import { User, Board } from '../shared/models';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Toast } from '../shared/lib/toast/toast.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  user$: Observable<User> = this.state.select('user');
  boards$: Observable<Board>;
  newBoardName: string;

  constructor(private boardService: BoardService,
    private state: AppState,
    private route: ActivatedRoute,
    private router: Router,
    private toast: Toast) { }

  ngOnInit() {
    this.boards$ = this.route.data.pipe(map(data => data.user.boards));
  }

  async addBoard() {
    const user = this.state.get('user');
    try {
      const board = await this.boardService.createBoard({ userId: user._id, boardName: this.newBoardName })
        .toPromise();
      this.router.navigate(['/board', board._id]);
    } catch (err) {
      this.toast.show('An error occured', { type: 'error' });
    }
  }

}
