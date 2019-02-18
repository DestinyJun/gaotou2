import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ShopManagerComponent} from './shop-manager.component';
const routes: Routes = [
  {path: '', component: ShopManagerComponent},
];
@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class ShopManagerRoutingModule {}
