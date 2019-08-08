import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EchartsScatterAComponent } from './echarts-scatter-a.component';
import {NgxEchartsModule} from 'ngx-echarts';

@NgModule({
  imports: [
    CommonModule,
    NgxEchartsModule
  ],
  declarations: [EchartsScatterAComponent],
  exports: [EchartsScatterAComponent]
})
export class EchartsScatterAModule { }
