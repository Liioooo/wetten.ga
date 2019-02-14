import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {AuthService} from '../../../../shared/services/auth/auth.service';
import {ChatService} from '../../services/chat.service';
import {CdkVirtualScrollViewport} from '@angular/cdk/scrolling';
import {Observable, Subscription} from 'rxjs';
import {Message} from '../../models/Message';
import {delay, tap} from 'rxjs/operators';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnDestroy {

    @ViewChild(CdkVirtualScrollViewport)
    scrollViewport: CdkVirtualScrollViewport;

    @ViewChild('scrollElement') scrollElement;

    public messages: Message[];
    public currentlyTyped = '';
    private messageSubscription: Subscription;

    constructor(public authService: AuthService, public chatService: ChatService) {
    }

    ngOnInit() {
      this.chatService.getNextMessages();
      this.messageSubscription = this.chatService.getMessages().pipe(
          tap(messages => this.messages = messages),
          delay(100)
      ).subscribe(() => {
          //this.scrollElement.nativeElement.scrollTo(0, this.scrollElement.nativeElement.scrollHeight);
      });
    }

    scrolled() {
        if (this.scrollElement.nativeElement.scrollTop === 0) {
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

    ngOnDestroy() {
      this.messageSubscription.unsubscribe();
    }
}
