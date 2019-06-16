import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EchartGaugeAComponent } from './echart-gauge-a.component';
import {NgxEchartsModule} from 'ngx-echarts';

@NgModule({
  imports: [
    CommonModule,
    NgxEchartsModule
  ],
  declarations: [EchartGaugeAComponent],
  exports: [EchartGaugeAComponent]
})
export class EchartGaugeAModule { }
