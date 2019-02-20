import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {AuthService} from '@shared/services/auth/auth.service';
import {ChatService} from '../../services/chat/chat.service';
import {Message} from '../../models/Message';
import {Subscription} from 'rxjs';
import {firestore} from 'firebase';
import Timestamp = firestore.Timestamp;
import {delay} from 'rxjs/operators';

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
    private newMessageSubscription: Subscription;

    constructor(public authService: AuthService, public chatService: ChatService) {
    }

    ngOnInit() {
        this.chatService.getNextMessages();
        this.messageSubscription = this.chatService.getMessages().subscribe(messages => {
            this.messages = messages;
        });
        this.newMessageSubscription = this.chatService.onNewMessage.pipe(
            delay(30)
        ).subscribe(() => {
            this.scrollElement.nativeElement.scrollTo(0, this.scrollElement.nativeElement.scrollHeight);
        });
    }

    scrolled() {
        if (this.scrollElement.nativeElement.scrollTop <= 20) {
            this.chatService.getNextMessages(this.messages[0].timestamp);
        }
    }

    sendMessage() {
      this.chatService.sendMessage(this.currentlyTyped);
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
      this.newMessageSubscription.unsubscribe();
    }
}
