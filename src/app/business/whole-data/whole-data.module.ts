import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from '../../common/shared.module';
import {ScrollPanelModule} from 'primeng/primeng';
import {WholeDataComponent} from './whole-data.component';
import {WholeDataRoutingModule} from './whole-data.routing.module';
import {EchartsBarTemModule} from '../../common/components/echart-bar-tem/echarts-bar-tem.module';
import {EchartLineBarAreaAModule} from '../../common/components/echart-line-bar-area-a/echart-line-bar-area-a.module';
import {EchartsScatterAModule} from '../../common/components/echarts-scatter-a/echarts-scatter-a.module';
@NgModule({
  imports: [
    CommonModule,
    WholeDataRoutingModule,
    SharedModule,
    ScrollPanelModule,
    EchartsBarTemModule,
    EchartLineBarAreaAModule,
    EchartsScatterAModule
  ],
  declarations: [WholeDataComponent],
  providers: [],
  entryComponents: []
})
export class WholeDataModule { }
