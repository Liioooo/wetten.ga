import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PasswordMatch} from '@login/validators/PasswordMatch';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public registerFrom: FormGroup;
  public hasSubmitted = false;

  constructor(private formBuilder: FormBuilder) { }

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

  registerClick() {
    this.hasSubmitted = true;

    if (this.registerFrom.invalid) {
      return;
    }

    const email = this.registerFrom.controls.registerMail.value;
    const name = this.registerFrom.controls.name.value;
    const password = this.registerFrom.controls.registerPassword.value;
  }

}
