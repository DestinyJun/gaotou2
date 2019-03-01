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
import {SidebarComponent} from './sidebar/sidebar.component';
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
    TreeModule
  ],
  declarations: [
    HomeComponent,
    HeaderComponent,
    NavComponent,
    FooterComponent,
    MessageWindowComponent,
    SidebarComponent
  ],
  providers: [],
  entryComponents: [NavComponent]
})
export class HomeModule { }
