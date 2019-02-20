import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {map, mergeMap, scan, take, tap, throttleTime} from 'rxjs/operators';
import {Message} from '../../models/Message';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {firestore} from 'firebase';
import Timestamp = firestore.Timestamp;
import {AuthService} from '@shared/services/auth/auth.service';
import {joinCollections} from '@shared/rxjs-operators/joinCollections';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

    private receivedNewMessage = new Subject<void>();

    private offset = new BehaviorSubject(null);

    constructor(private afs: AngularFirestore, private authService: AuthService) { }

    getMessages(): Observable<Message[]> {
      let lastMessageId: string;
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
          }),
          tap(messages => {
              if (messages.length >= 1) {
                if (!lastMessageId) {
                    this.receivedNewMessage.next();
                } else if (lastMessageId !== messages[messages.length - 1].id) {
                    this.receivedNewMessage.next();
                }
                lastMessageId = messages[messages.length - 1].id;
              }
          })
      );
    }

    public get onNewMessage(): Observable<void> {
        return this.receivedNewMessage.asObservable();
    }

    getNextMessages(offset: any = '') {
        this.offset.next(offset);
    }

    getBatch(offset): Observable<any> {

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
            joinCollections('user', 'uid', 'users', this.afs, 'userDetails'),
            mergeMap(messages => this.authService.user$.pipe(
                map(user => {
                    return messages.map(message => {
                        message.wasSentByLoggedInUser = false;
                        if (user) {
                            message.wasSentByLoggedInUser = message.user.id === user.uid;
                        }
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
