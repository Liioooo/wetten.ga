import { Injectable } from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore';
import {Bet} from '../../models/Bet';

@Injectable({
  providedIn: 'root'
})
export class BetService {

  private betDoc: AngularFirestoreDocument<Bet>;

  constructor(
    private authService: AuthService,
    private afs: AngularFirestore
  ) {
    this.authService.user$.subscribe(user => this.betDoc = this.afs.doc(`bet/${this.authService.userRef.ref.id}`))
      .unsubscribe();
  }

  async updateStatus(bet: Bet) {
    await this.betDoc.set(bet, {merge: true});
  }

  async deleteBet() {
    await this.betDoc.delete();
  }

}
