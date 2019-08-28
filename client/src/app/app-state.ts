// import { Injectable } from "@angular/core";
// import { User } from './shared/models';
// import { Observable, BehaviorSubject } from 'rxjs';

// @Injectable({
//     providedIn: 'root'
// })
// export class AppState {
//     private state: StateHolder<IAppState> = this.init();

//     select<K extends keyof IAppState>(key: K): Observable<IAppState[K]> {
//         return this.state[key].asObservable();
//     }

//     get<K extends keyof IAppState>(key: K): IAppState[K] {
//         return this.state[key].value;
//     }

//     set<K extends keyof IAppState>(key: K, value: IAppState[K]) {
//         this.state[key].next(value);
//     }

//     private init(): StateHolder<IAppState> {
//         return {
//             user: new BehaviorSubject(null)
//         };
//     }
// }

// export interface IAppState {
//     user: User;
// }

// type StateHolder<T> = { [K in keyof T]: BehaviorSubject<T[K]> };