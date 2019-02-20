import { Component, OnInit } from '@angular/core';
import {Title} from '@angular/platform-browser';
import {projectName} from '@main/environments/project-name';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private titleSerice: Title) { }

  ngOnInit() {
    this.titleSerice.setTitle(`${projectName} - Home`);
  }

}
