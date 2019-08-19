import { Resolve } from '@angular/router';
import { Inject, Injectable } from '@angular/core';
import { UsersService } from '../shared/users.service';
import { AppState } from '../app-state';

@Injectable()
export class HomeResolve implements Resolve<any> {

    constructor(private usersService: UsersService, private state: AppState) { }

    resolve() {
        return this.usersService.getBoards({ userId: this.state.get('user')._id });
    }

}