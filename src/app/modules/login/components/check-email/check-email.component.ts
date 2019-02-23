import { Component, OnInit } from '@angular/core';
import {AuthService} from '@shared/services/auth/auth.service';

@Component({
  selector: 'app-check-email',
  templateUrl: './check-email.component.html',
  styleUrls: ['./check-email.component.scss']
})
export class CheckEmailComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  public sendAgain() {
    this.authService.sendVerificationMailAgain();
  }

  public hasVerifiedClicked() {
    this.authService.signOutEmailVerification();
  }

}
