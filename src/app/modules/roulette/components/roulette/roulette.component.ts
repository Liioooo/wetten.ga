import { Component, OnInit } from '@angular/core';
import {AuthService} from '@shared/services/auth/auth.service';
import {Title} from '@angular/platform-browser';
import {projectName} from '@main/environments/project-name';

@Component({
  selector: 'app-roulette',
  templateUrl: './roulette.component.html',
  styleUrls: ['./roulette.component.scss']
})
export class RouletteComponent implements OnInit {

  constructor(
      public authService: AuthService,
      private titleSerice: Title
  ) {
  }

  ngOnInit() {
    this.titleSerice.setTitle(`${projectName} - Roulette`);
  }

}
