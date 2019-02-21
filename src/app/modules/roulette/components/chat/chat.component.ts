import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {AuthService} from '@shared/services/auth/auth.service';
import {ChatService} from '../../services/chat/chat.service';
import {Message} from '../../models/Message';
import {Subscription} from 'rxjs';
import {firestore} from 'firebase';
import Timestamp = firestore.Timestamp;
import {delay, distinctUntilChanged, map} from 'rxjs/operators';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnDestroy {

    @ViewChild('scrollElement') scrollElement;

    public messages: Message[];
    private messageSubscription: Subscription;
    private newMessageSubscription: Subscription;
    private loggedInSubscription: Subscription;
    private chatForm: FormGroup;
    private lastTimeSent = 0;

    constructor(public authService: AuthService, public chatService: ChatService, private formBuilder: FormBuilder) {
    }

    ngOnInit() {
        this.chatForm = this.formBuilder.group({
           'chatMessage': ['', [Validators.required, Validators.maxLength(500)]]
        });
        this.loggedInSubscription = this.authService.user$.pipe(
            map(user => user !== null),
            distinctUntilChanged()
        ).subscribe(loggedIn => {
            if (loggedIn) {
                this.chatForm.controls.chatMessage.enable();
            } else {
                this.chatForm.controls.chatMessage.disable();
            }
        });

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
      if (this.chatForm.invalid || this.chatForm.controls.chatMessage.value.trim().length === 0 || Date.now() - this.lastTimeSent < 1000) {
          return;
      }

      this.lastTimeSent = Date.now();
      this.chatService.sendMessage(this.chatForm.controls.chatMessage.value);
      this.chatForm.reset();
    }

    checkEnter({keyCode}: KeyboardEvent) {
      if (keyCode === 13) {
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
      this.loggedInSubscription.unsubscribe();
    }
}
