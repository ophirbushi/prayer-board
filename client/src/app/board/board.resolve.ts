import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { BoardService } from '../shared/board.service';

@Injectable()
export class BoardResolve implements Resolve<any> {

    constructor(private boardService: BoardService) { }

    resolve(route: ActivatedRouteSnapshot) {
        const id = route.paramMap.get('id');
        return this.boardService.getBoardPrayerRequests({ boardId: id });
    }
}