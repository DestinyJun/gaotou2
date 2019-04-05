import { NgModule } from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import {SharedModule} from '../../common/shared.module';
import { CityDataComponent } from './city-data.component';
import {CityDataRoutingModule} from './city-data.routing.module';
import {PagingModule, WenjunAlertModule} from '../../common/wenjun';
import { CityDataService } from '../../common/services/city-data.service';
import {CalendarModule, ScrollPanelModule} from 'primeng/primeng';
import {FormsModule} from '@angular/forms';
import {DataService} from '../../common/services/data.service';
import {City3dComponent} from './city-3d/city-3d.component';
import {CityCarComponent} from './city-car/city-car.component';
import {CityCrosswiseComponent} from './city-crosswise/city-crosswise.component';
import {CityIncomeComponent} from './city-income/city-income.component';
import {CityEvnstatComponent} from './city-evnstat/city-evnstat.component';
import {CityEvnofficeComponent} from './city-evnoffice/city-evnoffice.component';
import {CityEvnpersonComponent} from './city-evnperson/city-evnperson.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    CityDataRoutingModule,
    SharedModule,
    WenjunAlertModule,
    CalendarModule,
    ScrollPanelModule,
    PagingModule
  ],
  declarations: [
    CityDataComponent,
    City3dComponent,
    CityCarComponent,
    CityCrosswiseComponent,
    CityIncomeComponent,
    CityEvnstatComponent,
    CityEvnofficeComponent,
    CityEvnpersonComponent
  ],
  providers: [CityDataService, DataService, DatePipe]
})
export class CityDataModule { }
