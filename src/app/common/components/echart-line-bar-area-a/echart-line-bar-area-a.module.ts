import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EchartLineBarAreaAComponent } from './echart-line-bar-area-a.component';
import {NgxEchartsModule} from 'ngx-echarts';

@NgModule({
  imports: [
    CommonModule,
    NgxEchartsModule,
  ],
  declarations: [EchartLineBarAreaAComponent],
  exports: [
    EchartLineBarAreaAComponent
  ]
})
export class EchartLineBarAreaAModule { }
