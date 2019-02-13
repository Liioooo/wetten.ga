import {Component, OnInit, ViewChild} from '@angular/core';
import {AuthService} from '../../../../shared/services/auth/auth.service';
import {ChatService} from '../../services/chat.service';
import {CdkVirtualScrollViewport} from '@angular/cdk/scrolling';
import {Observable} from 'rxjs';
import {Message} from '../../models/Message';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

    @ViewChild(CdkVirtualScrollViewport)
    scrollViewport: CdkVirtualScrollViewport;

    public messages$: Observable<Message[]>;

    public currentlyTyped = '';

    constructor(public authService: AuthService, public chatService: ChatService) {
    }

    ngOnInit() {
      this.messages$ = this.chatService.getMessages();
    }

    sendMessage() {
      this.chatService.sendMessage(this.currentlyTyped);
      this.currentlyTyped = '';
    }

    scrolled() {

    }

}
