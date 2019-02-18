import {combineLatest, Observable, of} from 'rxjs';
import {map, switchMap, tap} from 'rxjs/operators';
import {AngularFirestore} from '@angular/fire/firestore';

export const joinCollections = (keyInCollectionA: string, keyInCollectionB: string, collectionToJoin: string, afs: AngularFirestore, toAssignJoinedObject?: string) => (source: Observable<any>) => {
    if (!toAssignJoinedObject) {
        toAssignJoinedObject = keyInCollectionA;
    }
    let values;
    const joinKeys = {};

    return source.pipe(
        switchMap(tempValues => {
            values = tempValues;
            const ids = Array.from(new Set(values.map(v => v[keyInCollectionA].id)));
            const joinedDocs = ids.map(id =>
                afs.doc(`${collectionToJoin}/${id}`).valueChanges()
            );
            return joinedDocs.length ? combineLatest(joinedDocs) : of([]);
        }),
        map(arr => {
            arr.forEach(v => joinKeys[v[keyInCollectionB]] = v);
            values = values.map(v => {
                return { ...v, [toAssignJoinedObject]: joinKeys[v[keyInCollectionA].id] };
            });
            return values;
        })
    );
};
