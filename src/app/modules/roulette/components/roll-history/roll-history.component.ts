import { Component, OnInit } from '@angular/core';
import {RouletteService} from '../../../../shared/services/roullete/roullete.service';

@Component({
  selector: 'app-roll-history',
  templateUrl: './roll-history.component.html',
  styleUrls: ['./roll-history.component.scss']
})
export class RollHistoryComponent implements OnInit {

  constructor(public rouletteService: RouletteService) { }

  ngOnInit() {
    // this.rouletteService.getRollHistory().subscribe(data => {
    //   console.log(data[0]);
    // });
  }

}
