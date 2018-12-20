import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HomeRoutingModule} from './home.routing.module';
import { HomeComponent } from './home.component';
import { HeaderComponent } from './header/header.component';
import { NavComponent } from './nav/nav.component';
import { FooterComponent } from './footer/footer.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MessageWindowComponent } from './message-window/message-window.component';
import {DialogModule} from 'primeng/dialog';
import {NgxEchartsModule} from 'ngx-echarts';
import {EchartNationaPersonModule, EchartProvincePersonModule} from '../common/wenjun';
import {ScrollPanelModule} from 'primeng/primeng';


@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    DialogModule,
    NgxEchartsModule,
    EchartNationaPersonModule,
    EchartProvincePersonModule,
    ScrollPanelModule,
  ],
  declarations: [
    HomeComponent,
    HeaderComponent,
    NavComponent,
    FooterComponent,
    MessageWindowComponent
  ],
  providers: [],
  entryComponents: [NavComponent]
})
export class HomeModule { }
