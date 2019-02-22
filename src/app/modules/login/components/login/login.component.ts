import { Component, OnInit } from '@angular/core';
import {Title} from '@angular/platform-browser';
import {projectName} from '@main/environments/project-name';
import {AuthService} from '@shared/services/auth/auth.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    public loginFrom: FormGroup;
    public hasSubmitted = false;

    constructor(
        private titleService: Title,
        private authService: AuthService,
        private formBuilder: FormBuilder
    ) { }

    ngOnInit() {
        this.titleService.setTitle(` ${projectName} - Login`);
        this.loginFrom = this.formBuilder.group({
            'loginMail': ['', [Validators.required, Validators.email]],
            'loginPassword': ['', [Validators.required, Validators.minLength(8)]]
        });
    }

    public loginClicked(type: string) {
        this.authService.signIn(type);
    }

    public loginEmailClicked() {
        this.hasSubmitted = true;
        if (this.loginFrom.invalid) {
           return;
        }

        const email = this.loginFrom.controls.loginMail.value;
        const password = this.loginFrom.controls.loginPassword.value;
    }

}
