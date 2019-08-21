import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { BoardService } from '../shared/board.service';
import { Board } from '../shared/models';

@Injectable()
export class BoardResolve implements Resolve<Board> {

    constructor(private boardService: BoardService) { }

    resolve(route: ActivatedRouteSnapshot) {
        const id = route.paramMap.get('id');
        return this.boardService.getBoard({ boardId: id }, true);
    }
}