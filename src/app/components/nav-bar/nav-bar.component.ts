import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../shared/services/auth/auth.service';
import {Location} from '@angular/common';
import {Router} from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  constructor(
    public authService: AuthService,
    public location: Location
    ) { }

  ngOnInit() {
  }

  public loginClicked() {
      this.authService.signIn();
  }
}
