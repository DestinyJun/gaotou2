import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EchartsBarDoubleComponent } from './echarts-bar-double.component';
import {NgxEchartsModule} from 'ngx-echarts';

@NgModule({
  imports: [
    CommonModule,
    NgxEchartsModule
  ],
  declarations: [EchartsBarDoubleComponent],
  exports: [EchartsBarDoubleComponent]
})
export class EchartsBarDoubleModule { }
