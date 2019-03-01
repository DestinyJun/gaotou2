import {animate, state, style, transition, trigger} from '@angular/animations';

export const leftToRight =  [
  trigger('sidebarAnimate', [
    state('in', style({transform: 'translateX(180)'})),
    state('out', style({transform: 'translateX(0)'}))]),
];
