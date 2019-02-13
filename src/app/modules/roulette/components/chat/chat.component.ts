import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../../../shared/services/auth/auth.service';
import {ChatService} from '../../services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  public currentlyTyped = '';

  constructor(public authService: AuthService, public chatService: ChatService) { }

  ngOnInit() {
  }

}
