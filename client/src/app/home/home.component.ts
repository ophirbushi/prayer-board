import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { BoardService } from '../shared/board.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  userId: string = this.authService.getUserId();
  boards = [];
  newBoardName: string;

  constructor(private authService: AuthService, private boardService: BoardService) { }

  ngOnInit() {
  }

  addBoard() {
    this.boardService.createBoard({ userId: this.userId, boardName: this.newBoardName }).toPromise();
  }

}
