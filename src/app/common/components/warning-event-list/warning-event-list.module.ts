import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {WarningEventListComponent} from './warning-event-list.component';
import {ButtonModule} from 'primeng/button';

@NgModule({
  imports: [
    CommonModule,
    ButtonModule
  ],
  declarations: [WarningEventListComponent],
  exports: [WarningEventListComponent]
})
export class WarningEventListModule { }
