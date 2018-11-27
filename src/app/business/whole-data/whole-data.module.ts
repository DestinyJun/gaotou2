import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from '../../common/shared.module';
import {ScrollPanelModule} from 'primeng/primeng';
import {WholeDataComponent} from './whole-data.component';
import {WholeDataRoutingModule} from './whole-data.routing.module';
@NgModule({
  imports: [
    CommonModule,
    WholeDataRoutingModule,
    SharedModule,
    ScrollPanelModule
  ],
  declarations: [WholeDataComponent],
  providers: [],
  entryComponents: []
})
export class WholeDataModule { }
