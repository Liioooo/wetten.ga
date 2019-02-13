import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {map, mergeMap, take, tap} from 'rxjs/operators';
import {Message} from '../models/Message';
import {Observable} from 'rxjs';
import {firestore} from 'firebase';
import Timestamp = firestore.Timestamp;
import {AuthService} from '../../../shared/services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private afs: AngularFirestore, private authService: AuthService) { }


  getMessages(): Observable<Message[]> {
    return this.afs.collection<Message>('chat', ref => ref
        .orderBy('timestamp')
      ).valueChanges().pipe(
          mergeMap(messages => this.authService.user$.pipe(
              map(user => {
                  return messages.map(message => {
                      message.wasSentByLoggedInUser = message.user.id === user.uid;
                      return message;
                  });
              })
          ))
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
