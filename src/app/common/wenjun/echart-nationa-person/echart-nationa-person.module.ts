import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EchartNationaPersonComponent } from './echart-nationa-person.component';
import {NgxEchartsModule} from 'ngx-echarts';

@NgModule({
  imports: [
    CommonModule,
    NgxEchartsModule
  ],
  declarations: [EchartNationaPersonComponent],
  exports: [EchartNationaPersonComponent]
})
export class EchartNationaPersonModule { }
