import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from './home.component';
import {LoginGuard} from '../common/guard/login.guard';
const routes: Routes = [
  {
    path: '', component: HomeComponent,
    children: [
      {path: '', redirectTo: 'whole', pathMatch: 'full'},
      {path: 'whole', loadChildren: 'app/business/whole-data/whole-data.module#WholeDataModule',  canActivate: [LoginGuard]},
      {path: 'province', loadChildren: 'app/business/province-data/province-data.module#ProvinceDataModule',  canActivate: [LoginGuard]},
      {path: 'city', loadChildren: 'app/business/city-data/city-data.module#CityDataModule',  canActivate: [LoginGuard]},
      {path: 'serzone', loadChildren: 'app/business/service-data/service-data.module#ServiceDataModule',  canActivate: [LoginGuard]},
      {path: 'camera', loadChildren: 'app/business/video-window/video-window.module#VideoWindowModule',  canActivate: [LoginGuard]},
      {path: 'personal', loadChildren: 'app/business/personal/personal.module#PersonalModule', canActivate: [LoginGuard]},
      {path: 'shop', loadChildren: 'app/business/shop-manager/shop-manager.module#ShopManagerModule'},
      {path: 'sermanger', loadChildren: 'app/business/service-manager/service-manager.module#ServiceManagerModule'},
    ]
  },
];
@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class HomeRoutingModule {}
