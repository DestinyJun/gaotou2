import { NgModule } from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import { PersonalComponent } from './personal.component';
import {PersonalRoutingModule} from './personal.routing.module';
import {SharedModule} from '../../common/shared.module';
import { PersonalService } from '../../common/services/personal.service';
import {RadioButtonModule} from 'primeng/radiobutton';
import {CalendarModule} from 'primeng/calendar';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
@NgModule({
  imports: [
    CommonModule,
    PersonalRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    CalendarModule,
    RadioButtonModule
  ],
  declarations: [PersonalComponent],
  providers: [PersonalService, DatePipe]
})
export class PersonalModule { }
