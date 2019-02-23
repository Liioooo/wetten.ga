import { Component } from '@angular/core';
import {animate, group, query, style, transition, trigger} from '@angular/animations';
import {PwaService} from '@shared/services/pwa/pwa.service';
import {NavigationEnd, Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('routerTransition', [
      transition('roulette => home, dashboard => roulette, dashboard => home, loginLogin => home, loginLogin => roulette, loginRegister => home, loginRegister => roulette, loginVerify => home, loginVerify => roulette', [
        style({ height: '!' }),

        query(':enter, :leave', style({ position: 'absolute', left: 0, right: 0 })),
        query(':enter', style({ transform: 'translateX(-100vw)' }), { optional: true }),

        group([
          query(':leave', [
            animate('0.3s cubic-bezier(.35,0,.25,1)', style({ transform: 'translateX(100vw)' })),
          ]),
          // and now reveal the enter
          query(':enter', animate('0.3s cubic-bezier(.35,0,.25,1)', style({ transform: 'translateX(0)' }))),
        ])
      ]),
      transition('home  => roulette, roulette => dashboard, home => dashboard, home => loginLogin, roulette => loginLogin', [
        style({ height: '!' }),

        query(':enter, :leave', style({ position: 'absolute', left: 0, right: 0 })),
        query(':enter', style({ transform: 'translateX(100vw)' }), { optional: true }),

        group([
          query(':leave', [
            animate('0.3s cubic-bezier(.35,0,.25,1)', style({ transform: 'translateX(-100vw)' })),
          ]),
          // and now reveal the enter
          query(':enter', animate('0.3s cubic-bezier(.35,0,.25,1)', style({ transform: 'translateX(0)' }))),
        ])
      ]),
      transition('loginLogin <=> loginRegister, loginLogin <=> loginVerify, loginRegister <=> loginVerify', [
        query(':enter, :leave', style({ position: 'absolute', left: 0, right: 0, opacity: 1 })),
        group([
          query(':enter', [
            style({ opacity: 0 }),
            animate('200ms ease-in-out', style({ opacity: 1 }))
          ]),
          query(':leave', [
            style({ opacity: 1 }),
            animate('200ms ease-in-out', style({ opacity: 0 }))]),
        ])
      ])
    ])
  ]
})
export class AppComponent {

  constructor(public pwaService: PwaService, private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        (<any>window).ga('set', 'page', event.urlAfterRedirects);
        (<any>window).ga('send', 'pageview');
      }
    });
  }


  getState(outlet) {
    return outlet.activatedRouteData.type;
  }
}
