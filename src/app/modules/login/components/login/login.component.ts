import { Component, OnInit } from '@angular/core';
import {Title} from '@angular/platform-browser';
import {projectName} from '@main/environments/project-name';
import {AuthService} from '@shared/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    constructor(private titleService: Title, private authService: AuthService) { }

    ngOnInit() {
        this.titleService.setTitle(` ${projectName} - Login`);
    }

    public loginClicked(type: string) {
        this.authService.signIn(type);
    }

}
