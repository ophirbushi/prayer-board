import { Injectable } from "@angular/core";
import { AppState } from '../app-state';
import { Observable, timer, of } from 'rxjs';
import { switchMap, map, takeUntil, skip } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class LoaderService {
    private initialLoading = true;
    private readonly showLoaderAfter = 100;
    private readonly showSpinnerAfter = 1000;
    private readonly loaderTimeout = 10 * 1000;
    loading$: Observable<boolean> = this.state.select('loading');
    displayLoader$: Observable<boolean> = this.state.select('loading').pipe(
        switchMap(loading => {
            if (!loading) return of(false);
            if (this.initialLoading) {
                this.initialLoading = false;
                return of(true);
            }
            return timer(this.showLoaderAfter).pipe(map(() => true))
        })
    );
    displaySpinner$: Observable<boolean> = this.state.select('loading').pipe(
        switchMap(loading => {
            if (!loading) return of(false);
            return timer(this.showSpinnerAfter).pipe(map(() => true))
        })
    );
    get loading(): boolean { return this.state.get('loading'); }

    constructor(private state: AppState) { }

    setLoader(value: boolean) {
        this.state.set('loading', value);

        // set loader timeout:
        if (value) {
            timer(this.loaderTimeout)
                .pipe(
                    // cancel timeout if loading status changes
                    takeUntil(this.state.select('loading').pipe(
                        // skip first value since it is emitted immediately
                        skip(1)
                    ))
                ).subscribe(() => {
                    this.state.set('loading', false);
                });
        }
    }
}
