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
import {EventsService} from '../common/services/events.service';
import {ToolsService} from '../common/services/tools.service';


@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    DialogModule,
    NgxEchartsModule,
  ],
  declarations: [
    HomeComponent,
    HeaderComponent,
    NavComponent,
    FooterComponent,
    MessageWindowComponent
  ],
  providers: [
    EventsService,
    ToolsService
  ],
  entryComponents: [NavComponent]
})
export class HomeModule { }
