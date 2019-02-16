import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../../../shared/services/auth/auth.service';

@Component({
  selector: 'app-roulette',
  templateUrl: './roulette.component.html',
  styleUrls: ['./roulette.component.scss']
})
export class RouletteComponent implements OnInit {

  constructor(public authService: AuthService) { }

  ngOnInit() {
  }

}
