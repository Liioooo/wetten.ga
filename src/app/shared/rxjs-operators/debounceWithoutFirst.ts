import {merge, Observable} from 'rxjs';
import {debounce, throttle} from 'rxjs/operators';
import {SubscribableOrPromise} from 'rxjs/src/internal/types';

export const debounceWithoutFirst = (durationSelector: (value: any) => SubscribableOrPromise<any>) => (source: Observable<any>) => {
    return merge(
        source.pipe(debounce(durationSelector)),
        source.pipe(throttle(durationSelector))
    );
};


