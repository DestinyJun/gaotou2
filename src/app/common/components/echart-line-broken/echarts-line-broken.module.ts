import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EchartsLineBrokenComponent } from './echarts-line-broken.component';
import {NgxEchartsModule} from 'ngx-echarts';

@NgModule({
  imports: [
    CommonModule,
    NgxEchartsModule,
  ],
  declarations: [EchartsLineBrokenComponent],
  exports: [
    EchartsLineBrokenComponent
  ]
})
export class EchartsLineBrokenModule { }
