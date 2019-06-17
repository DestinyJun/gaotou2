import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ServiceOwnerComponent} from './service-owner.component';

const routes: Routes = [
  {path: '', component: ServiceOwnerComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServiceOwnerRoutingModule { }
