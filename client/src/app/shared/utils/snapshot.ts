import { Observable, Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';

export const snapshot = <T>(source: Observable<T>): T => {
    let value: T;

    const done = new Subject();

    source
        .pipe(
            take(1),
            takeUntil(done)
        )
        .subscribe(x => {
            value = x;
        });

    done.next();
    done.complete();

    return value;
};
