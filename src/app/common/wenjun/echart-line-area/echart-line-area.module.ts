import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EchartLineAreaComponent } from './echart-line-area.component';
import {NgxEchartsModule} from 'ngx-echarts';

@NgModule({
  imports: [
    CommonModule,
    NgxEchartsModule
  ],
  declarations: [EchartLineAreaComponent],
  exports: [EchartLineAreaComponent]
})
export class EchartLineAreaModule { }
