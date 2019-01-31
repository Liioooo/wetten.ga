import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../shared/services/auth/auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  constructor(public authService: AuthService) { }

  ngOnInit() {
  }

  public loginClicked() {
      this.authService.signIn();
  }

}
