import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../../../shared/services/auth/auth.service';
import {firestore} from 'firebase';
import Timestamp = firestore.Timestamp;
import {Title} from '@angular/platform-browser';
import {projectName} from '../../../../../environments/project-name';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(
      public authService: AuthService,
      private titleSerice: Title
  ) { }

  ngOnInit() {
    this.titleSerice.setTitle(` ${projectName} - Dashboard`);
  }

  public convertTimestampToString(timestamp: Timestamp): string {
    return timestamp.toDate().toLocaleString();
  }

}
