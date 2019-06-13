import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {LoginGuard} from './common/guard/login.guard';
import {LoginRemindComponent} from './login-remind/login-remind.component';
const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'remind', component: LoginRemindComponent},
  {
    path: 'home',
    loadChildren: 'app/home/home.module#HomeModule',
    // canActivate: [LoginGuard]
  },
  {path: '**', component: LoginComponent}
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
