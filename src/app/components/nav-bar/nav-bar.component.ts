import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../shared/services/auth/auth.service';
import {projectName} from '../../../environments/project-name';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  public projectName = projectName;

  constructor(
    public authService: AuthService
    ) { }

  ngOnInit() {
  }

  public loginClicked(type: string) {
      this.authService.signIn(type);
  }
}
