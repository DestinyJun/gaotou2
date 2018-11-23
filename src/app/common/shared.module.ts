import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {NgxEchartsModule} from 'ngx-echarts';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {EventsService} from './services/events.service';
import {Data3dService} from './services/data3d.service';
import {CentermapService} from './services/centermap.service';
import {DiagramService} from './services/diagram.service';
import {ToolsService} from './services/tools.service';
import {DataService} from './services/data.service';
import { TableMenuComponent } from './components/table-menu/table-menu.component';
import { TimerShaftCrosswiseComponent } from './components/timer-shaft-crosswise/timer-shaft-crosswise.component';
import { TimerShaftLengthwaysComponent } from './components/timer-shaft-lengthways/timer-shaft-lengthways.component';
import { Echart3dComponent } from './components/echart3d/echart3d.component';
import {CalendarModule} from 'primeng/primeng';
import { EchartBasicbarComponent } from './components/echart-basicbar/echart-basicbar.component';
import { EchartPieComponent } from './components/echart-pie/echart-pie.component';

@NgModule({
  declarations: [
    TableMenuComponent,
    TimerShaftCrosswiseComponent,
    TimerShaftLengthwaysComponent,
    Echart3dComponent,
    EchartBasicbarComponent,
    EchartPieComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    NgxEchartsModule,
    FormsModule,
    ReactiveFormsModule,
    CalendarModule,
  ],
  exports: [
    HttpClientModule,
    NgxEchartsModule,
    FormsModule,
    ReactiveFormsModule,
    TableMenuComponent,
    TimerShaftCrosswiseComponent,
    TimerShaftLengthwaysComponent,
    Echart3dComponent,
    EchartBasicbarComponent,
    EchartPieComponent
  ],
  providers: [
    EventsService,
    Data3dService,
    CentermapService,
    DiagramService,
    ToolsService,
    DataService
  ]
})
export class SharedModule { }
