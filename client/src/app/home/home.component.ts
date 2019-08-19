import { Component, OnInit } from '@angular/core';
import { BoardService } from '../shared/board.service';
import { AppState } from '../app-state';
import { Observable } from 'rxjs';
import { User } from '../shared/models';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  user$ : Observable<User> = this.state.select('user');
  boards = [];
  newBoardName: string;

  constructor(private boardService: BoardService,
    private state: AppState) { }

  ngOnInit() {
  }

  addBoard() {
    const user = this.state.get('user');
    this.boardService.createBoard({ userId: user._id, boardName: this.newBoardName }).toPromise();
  }

}
