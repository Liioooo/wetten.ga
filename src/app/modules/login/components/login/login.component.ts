import { Component, OnInit } from '@angular/core';
import {Title} from '@angular/platform-browser';
import {projectName} from '@main/environments/project-name';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private titleService: Title) { }

  ngOnInit() {
      this.titleService.setTitle(` ${projectName} - Login`);
  }

}
