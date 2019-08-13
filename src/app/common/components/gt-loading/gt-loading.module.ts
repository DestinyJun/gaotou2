import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GtLoadingComponent } from './gt-loading.component';
import {ProgressSpinnerModule} from 'primeng/primeng';

@NgModule({
  imports: [
    CommonModule,
    ProgressSpinnerModule
  ],
  declarations: [GtLoadingComponent],
  exports: [GtLoadingComponent]
})
export class GtLoadingModule { }
