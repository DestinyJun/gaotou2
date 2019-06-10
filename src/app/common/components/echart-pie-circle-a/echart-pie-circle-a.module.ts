import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EchartPieCircleAComponent } from './echart-pie-circle-a.component';
import {NgxEchartsModule} from 'ngx-echarts';

@NgModule({
  imports: [
    CommonModule,
    NgxEchartsModule
  ],
  declarations: [EchartPieCircleAComponent],
  exports: [EchartPieCircleAComponent]
})
export class EchartPieCircleAModule { }
