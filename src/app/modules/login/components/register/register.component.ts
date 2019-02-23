import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PasswordMatch} from '@login/validators/PasswordMatch';
import {AuthService} from '@shared/services/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public registerFrom: FormGroup;
  public hasSubmitted = false;

  constructor(
      private formBuilder: FormBuilder,
      private authService: AuthService
  ) { }

  ngOnInit() {
    this.registerFrom = this.formBuilder.group({
       'registerMail': ['', [Validators.required, Validators.email]],
       'name': ['', [Validators.required, Validators.maxLength(60)]],
       'registerPassword': ['', [Validators.required, Validators.minLength(8)]],
       'registerPasswordRepeat': ['', [Validators.required]],
    }, {
      validators: [PasswordMatch.matches]
    });
  }

  async registerClick() {
    this.hasSubmitted = true;

    if (this.registerFrom.invalid) {
      return;
    }

    const email = this.registerFrom.controls.registerMail.value;
    const name = this.registerFrom.controls.name.value;
    const password = this.registerFrom.controls.registerPassword.value;

    const response = await this.authService.signUpEmail(email, password, name);
    if (response === 'auth/email-already-in-use') {
      this.registerFrom.controls.registerMail.setErrors({emailInUse: true});
    }
  }

}
