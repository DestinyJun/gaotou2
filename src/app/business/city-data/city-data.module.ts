import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from '../../common/shared.module';

import { CityDataComponent } from './city-data.component';
import {CityDataRoutingModule} from './city-data.routing.module';
import {WenjunAlertModule} from '../../common/wenjun';
import { CityDataService } from '../../common/services/city-data.service';
import {CalendarModule, ScrollPanelModule} from 'primeng/primeng';
import {FormsModule} from '@angular/forms';
import {DataService} from '../../common/services/data.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    CityDataRoutingModule,
    SharedModule,
    WenjunAlertModule,
    CalendarModule,
    ScrollPanelModule,
  ],
  declarations: [CityDataComponent],
  providers: [CityDataService, DataService]
})
export class CityDataModule { }
