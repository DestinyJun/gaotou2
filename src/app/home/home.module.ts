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
import {SidebarModule} from 'primeng/sidebar';
import {TreeModule} from 'primeng/tree';
import {CountUpModule} from 'countup.js-angular2';
import {FinanceDataService} from '../common/services/finance-data.service';
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
    SidebarModule,
    TreeModule,
    CountUpModule
  ],
  declarations: [
    HomeComponent,
    HeaderComponent,
    NavComponent,
    FooterComponent,
    MessageWindowComponent,
  ],
  providers: [FinanceDataService],
  entryComponents: [NavComponent]
})
export class HomeModule { }
