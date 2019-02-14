import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {AuthService} from '../../../../shared/services/auth/auth.service';
import {ChatService} from '../../services/chat.service';
import {CdkVirtualScrollViewport} from '@angular/cdk/scrolling';
import {Observable, Subscription} from 'rxjs';
import {Message} from '../../models/Message';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnDestroy {

    @ViewChild(CdkVirtualScrollViewport)
    scrollViewport: CdkVirtualScrollViewport;

    @ViewChild('scrollElement') scrollElement;

    public messages;
    public currentlyTyped = '';
    private messageSubscription: Subscription;

    constructor(public authService: AuthService, public chatService: ChatService) {
    }

    ngOnInit() {
      this.messageSubscription = this.chatService.getMessages().subscribe(x => {
        this.messages = x;
        this.scrollElement.nativeElement.scrollTo(0, this.scrollElement.nativeElement.scrollHeight); // Needs to be animated + Delayed
      });
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
