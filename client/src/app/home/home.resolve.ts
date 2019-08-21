import { Resolve } from '@angular/router';
import { Injectable } from '@angular/core';
import { UsersService } from '../shared/users.service';
import { AppState } from '../app-state';
import { User } from '../shared/models';

@Injectable()
export class HomeResolve implements Resolve<User> {

    constructor(private usersService: UsersService, private state: AppState) { }

    resolve() {
        return this.usersService.getUser({ userId: this.state.get('user')._id }, ['boards']);
    }

}