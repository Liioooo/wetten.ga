import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {map, mergeMap, scan, switchMap, take, tap, throttleTime} from 'rxjs/operators';
import {Message} from '../models/Message';
import {BehaviorSubject, combineLatest, Observable, of} from 'rxjs';
import {firestore} from 'firebase';
import Timestamp = firestore.Timestamp;
import {AuthService} from '../../../shared/services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

    private offset = new BehaviorSubject(null);

    constructor(private afs: AngularFirestore, private authService: AuthService) { }

    getMessages(): Observable<Message[]> {
      return this.offset.pipe(
          throttleTime(500),
          mergeMap(n => this.getBatch(n)),
          scan((acc, batch) => {
              return {...batch, ...acc};
          }, {}),
          map(messages => {
              const messageArray = [];
              Object.keys(messages).forEach(message => messageArray.push(messages[message]));
              return messageArray.sort((m1: Message, m2: Message) => m1.timestamp.seconds - m2.timestamp.seconds);
          })
      );
    }

    getNextMessages(offset: any = '') {
        this.offset.next(offset);
    }

    getBatch(offset): Observable<any> {
        let nachrichten;
        const joinKeys = {};

        return this.afs.collection<Message>('chat', ref => ref
            .orderBy('timestamp', 'desc')
            .startAfter(offset)
            .limit(5)
        ).snapshotChanges().pipe(
            map(actions => {
                return actions.map(action => {
                    const data = action.payload.doc.data();
                    const id = action.payload.doc.id;
                    return {id, ...data} as Message;
                }).reverse();
            }),
            switchMap(tempMessages => {
                nachrichten = tempMessages;
                const uids = Array.from(new Set(tempMessages.map(v => v.user.id)));
                const userDocs = uids.map(id =>
                    this.afs.doc(`users/${id}`).valueChanges()
                );
                return userDocs.length ? combineLatest(userDocs) : of([]);
            }),
            map(arr => {
                arr.forEach(v => joinKeys[v.uid] = v);
                nachrichten = nachrichten.map(v => {
                    return { ...v, userDetails: joinKeys[v.user.id] };
                });
                return nachrichten;
            }),
            mergeMap(messages => this.authService.user$.pipe(
                map(user => {
                    return messages.map(message => {
                        message.wasSentByLoggedInUser = message.user.id === user.uid;
                        return message;
                    });
                })
            )),
            map(messages => {
                return messages.reduce((acc, cur) => {
                    const id = cur.id;
                    return { ...acc, [id]: cur };
                }, {});
            })
        );
    }

    sendMessage(message: string) {
        this.authService.user$.pipe(
            take(1),
            map(user => user.uid)
        ).subscribe(userId => {
            this.afs.collection('chat').add({
                message: message,
                timestamp: Timestamp.now(),
                user: this.afs.collection('users').doc(userId).ref
            });
        });
    }
}
