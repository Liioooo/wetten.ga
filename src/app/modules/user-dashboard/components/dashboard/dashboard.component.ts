import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../../../shared/services/auth/auth.service';
import {firestore} from 'firebase';
import Timestamp = firestore.Timestamp;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(public authService: AuthService) { }

  ngOnInit() {
  }

  public covertTimestampToString(timestamp: Timestamp): string {
    return timestamp.toDate().toLocaleString();
  }

}
