import { Injectable } from "@angular/core";
import { UserMailbox } from './shared/models';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AppState {
    private state: StateHolder<IAppState> = this.init();

    select<K extends keyof IAppState>(key: K): Observable<IAppState[K]> {
        return this.state[key].asObservable() as any;
    }

    get<K extends keyof IAppState>(key: K): IAppState[K] {
        return this.state[key].value as any;
    }

    set<K extends keyof IAppState>(key: K, value: IAppState[K]) {
        this.state[key].next(value as any);
    }

    private init(): StateHolder<IAppState> {
        return {
            loading: new BehaviorSubject(false),
            mailbox: new BehaviorSubject(null)
        };
    }
}

export interface IAppState {
    loading: boolean;
    mailbox: UserMailbox;
}

type StateHolder<T> = { [K in keyof T]: BehaviorSubject<T[K]> };