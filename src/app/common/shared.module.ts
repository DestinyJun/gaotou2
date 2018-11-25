import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {NgxEchartsModule} from 'ngx-echarts';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { TableMenuComponent } from './components/table-menu/table-menu.component';
import { TimerShaftCrosswiseComponent } from './components/timer-shaft-crosswise/timer-shaft-crosswise.component';
import { TimerShaftLengthwaysComponent } from './components/timer-shaft-lengthways/timer-shaft-lengthways.component';
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

@NgModule({
  declarations: [
    TableMenuComponent,
    TimerShaftCrosswiseComponent,
    TimerShaftLengthwaysComponent,
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
    EventPersonComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    NgxEchartsModule,
    FormsModule,
    ReactiveFormsModule,
    CalendarModule,
    ScrollPanelModule
  ],
  exports: [
    TableMenuComponent,
    TimerShaftCrosswiseComponent,
    TimerShaftLengthwaysComponent,
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
    EventPersonComponent
  ],
  providers: []
})
export class SharedModule { }
