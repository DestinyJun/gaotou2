import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {NgxEchartsModule} from 'ngx-echarts';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { Echart3dComponent } from './components/echart3d/echart3d.component';
import {CalendarModule, ScrollPanelModule} from 'primeng/primeng';
import { EchartBasicbarComponent } from './components/echart-basicbar/echart-basicbar.component';
import { EchartPieComponent } from './components/echart-pie/echart-pie.component';
import { EchartCrossbarComponent } from './components/echart-crossbar/echart-crossbar.component';
import { NumberShowComponent } from './components/number-show/number-show.component';
import { EventStatisticComponent } from './components/event-statistic/event-statistic.component';
import { TitleOneComponent } from './components/title-one/title-one.component';
import {EventListComponent} from './components/event-list/event-list.component';
import { EventListInfoComponent } from './components/event-list-info/event-list-info.component';
import { EventOfficeComponent } from './components/event-office/event-office.component';
import { EventPersonComponent } from './components/event-person/event-person.component';
import { EchartBmapComponent } from './components/echart-bmap/echart-bmap.component';
import { EchartsCityBmapComponent } from './components/echarts-city-bmap/echarts-city-bmap.component';
import { EchartsRoseFigureComponent } from './components/echarts-rose-figure/echarts-rose-figure.component';
import { EchartsRingPieComponent } from './components/echarts-ring-pie/echarts-ring-pie.component';
import { EchartsAreaChartComponent } from './components/echarts-area-chart/echarts-area-chart.component';
import { EchartsLineMoveComponent } from './components/echarts-line-move/echarts-line-move.component';
@NgModule({
  declarations: [
    Echart3dComponent,
    EchartBasicbarComponent,
    EchartPieComponent,
    EchartCrossbarComponent,
    NumberShowComponent,
    EventStatisticComponent,
    TitleOneComponent,
    EventListComponent,
    EventListInfoComponent,
    EventOfficeComponent,
    EventPersonComponent,
    EchartBmapComponent,
    EchartsCityBmapComponent,
    EchartsRoseFigureComponent,
    EchartsRingPieComponent,
    EchartsAreaChartComponent,
    EchartsLineMoveComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    NgxEchartsModule,
    FormsModule,
    ReactiveFormsModule,
    CalendarModule,
    ScrollPanelModule,
  ],
  exports: [
    NgxEchartsModule,
    Echart3dComponent,
    EchartBasicbarComponent,
    EchartPieComponent,
    EchartCrossbarComponent,
    NumberShowComponent,
    EventStatisticComponent,
    TitleOneComponent,
    EventListComponent,
    EventListInfoComponent,
    EventOfficeComponent,
    EventPersonComponent,
    EchartBmapComponent,
    EchartsCityBmapComponent,
    EchartsRoseFigureComponent,
    EchartsRingPieComponent,
    EchartsAreaChartComponent,
    EchartsLineMoveComponent
  ],
  providers: []
})
export class SharedModule { }
