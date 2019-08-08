import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EchartBarDoubleAComponent } from './echart-bar-double-a.component';
import {NgxEchartsModule} from 'ngx-echarts';

@NgModule({
  imports: [
    CommonModule,
    NgxEchartsModule
  ],
  declarations: [EchartBarDoubleAComponent],
  exports: [EchartBarDoubleAComponent]
})
export class EchartBarDoubleAModule { }
