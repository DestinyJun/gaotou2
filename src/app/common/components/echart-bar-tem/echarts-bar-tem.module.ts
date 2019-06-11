import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EchartsBarTemComponent } from './echarts-bar-tem.component';
import {NgxEchartsModule} from 'ngx-echarts';

@NgModule({
  imports: [
    CommonModule,
    NgxEchartsModule,
  ],
  declarations: [EchartsBarTemComponent],
  exports: [EchartsBarTemComponent]
})
export class EchartsBarTemModule { }
