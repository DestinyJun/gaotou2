import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ServiceManagerComponent} from './service-manager.component';
const routes: Routes = [
  {path: '', component: ServiceManagerComponent},
];
@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class ServiceManagerRoutingModule {}
