import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EchartProvincePersonComponent } from './echart-province-person.component';
import {NgxEchartsModule} from 'ngx-echarts';

@NgModule({
  imports: [
    CommonModule,
    NgxEchartsModule
  ],
  declarations: [EchartProvincePersonComponent],
  exports: [
    EchartProvincePersonComponent
  ]
})
export class EchartProvincePersonModule { }
