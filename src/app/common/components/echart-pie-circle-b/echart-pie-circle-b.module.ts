import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EchartPieCircleBComponent } from './echart-pie-circle-b.component';
import {NgxEchartsModule} from 'ngx-echarts';

@NgModule({
  imports: [
    CommonModule,
    NgxEchartsModule
  ],
  declarations: [EchartPieCircleBComponent],
  exports: [EchartPieCircleBComponent]
})
export class EchartPieCircleBModule { }
