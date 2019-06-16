import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EchartGaugeBComponent } from './echart-gauge-b.component';
import {NgxEchartsModule} from 'ngx-echarts';

@NgModule({
  imports: [
    CommonModule,
    NgxEchartsModule
  ],
  declarations: [EchartGaugeBComponent],
  exports: [EchartGaugeBComponent]
})
export class EchartGaugeBModule { }
