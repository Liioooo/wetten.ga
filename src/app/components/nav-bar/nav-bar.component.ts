import { Component, OnInit } from '@angular/core';
import {AuthService} from '@shared/services/auth/auth.service';
import {projectName} from '@main/environments/project-name';
@Component({
    selector: 'app-nav-bar',
    templateUrl: './nav-bar.component.html',
    styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  public projectName = projectName;
  public collapsed = true;

  constructor(public authService: AuthService) { }

  ngOnInit() {
  }
}
