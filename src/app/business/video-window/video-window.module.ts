import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {VideoWindowRoutingModule} from './video-window.routing.module';
import {VideoWindowComponent} from './video-window.component';
import {SharedModule} from '../../common/shared.module';
import { VideoWindowService } from '../../common/services/video-window.service';
import {TreeModule} from 'primeng/tree';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ScrollPanelModule} from 'primeng/scrollpanel';
@NgModule({
  imports: [
    CommonModule,
    VideoWindowRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    TreeModule,
    ScrollPanelModule
  ],
  declarations: [VideoWindowComponent],
  providers: [VideoWindowService]
})
export class VideoWindowModule { }
