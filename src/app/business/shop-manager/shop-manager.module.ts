import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopManagerComponent } from './shop-manager.component';
import {ShopManagerRoutingModule} from './shop-manager.routing.module';

@NgModule({
  imports: [
    CommonModule,
    ShopManagerRoutingModule
  ],
  declarations: [ShopManagerComponent]
})
export class ShopManagerModule { }
