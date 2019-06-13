import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ServiceMangerComponent} from './service-manger.component';
const routes: Routes = [
  {path: '', component: ServiceMangerComponent},
];
@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class ServiceMangerRoutingModule {}
