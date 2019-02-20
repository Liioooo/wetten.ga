import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {AuthService} from '@shared/services/auth/auth.service';
import {ChatService} from '../../services/chat.service';
import {Message} from '../../models/Message';
import {delay, tap} from 'rxjs/operators';
import {Subscription} from 'rxjs';
import {firestore} from 'firebase';
import Timestamp = firestore.Timestamp;

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnDestroy {

    @ViewChild('scrollElement') scrollElement;

    public messages: Message[];
    public currentlyTyped = '';
    private messageSubscription: Subscription;

    private lastSent: string;
    private firstLoad = true;

    constructor(public authService: AuthService, public chatService: ChatService) {
    }

    ngOnInit() {
        this.scrollElement.nativeElement.scrollTo(0, this.scrollElement.nativeElement.scrollHeight);
        this.chatService.getNextMessages();
        this.messageSubscription = this.chatService.getMessages().pipe(
            tap(messages => this.messages = messages),
            delay(100)
        ).subscribe(messages => {
            if ((messages[messages.length - 1] && this.lastSent === messages[messages.length - 1].message) || this.firstLoad) {
                this.lastSent = '';
                this.scrollElement.nativeElement.scrollTo(0, this.scrollElement.nativeElement.scrollHeight);
                this.firstLoad = false;
            }
        });
    }

    scrolled() {
        if (this.scrollElement.nativeElement.scrollTop <= 40) {
            this.chatService.getNextMessages(this.messages[0].timestamp);
        }
    }

    sendMessage() {
      this.chatService.sendMessage(this.currentlyTyped);
      this.lastSent = this.currentlyTyped;
      this.currentlyTyped = '';
    }

    checkEnter({keyCode}: KeyboardEvent) {
      if (keyCode === 13 && this.currentlyTyped.length !== 0) {
        this.sendMessage();
      }
    }

    getTimeForTimestamp(timestamp: Timestamp): string {
        const date = timestamp.toDate();
        return `${this.formatNumbersForTime(date.getHours())}:${this.formatNumbersForTime(date.getMinutes())}`;
    }

    private formatNumbersForTime(number: number): string {
        return (number < 10 ? '0' : '') + number;
    }

    ngOnDestroy() {
      this.messageSubscription.unsubscribe();
    }
}
