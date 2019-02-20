import { Component, OnInit } from '@angular/core';
import {PwaService} from '@shared/services/pwa/pwa.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor(public pwaService: PwaService) { }

  ngOnInit() {
  }

}
