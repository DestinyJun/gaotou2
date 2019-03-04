import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {LocalStorageService} from '../services/local-storage.service';

@Injectable()
export class LoginGuard implements CanActivate {
  constructor (
    private localSessionStorage: LocalStorageService,
    private router: Router
  ) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
   /* if (state.url === '/home/serzone') {
      this.router.navigate([this.localSessionStorage.getObject('homePageRoute'), {id: 1, name: '久长服务区'}]);
      return false;
    }*/
    const stateUrlFirst = state.url.split('/')[2];
    const stateUrlSecond = stateUrlFirst.split(';');
    if (this.localSessionStorage.getObject('authentication').accessToken) {
      if (this.localSessionStorage.getObject('urlClass').indexOf(stateUrlSecond[0]) !== -1) {
        return true;
      } else {
        window.alert('很抱歉,您没有权限访问！！！');
        this.router.navigate([this.localSessionStorage.getObject('homePageRoute'), {id: 1, name: '久长服务区'}]);
        return false;
      }
    }
    else {
      this.router.navigate(['/remind']);
      return false;
    }
  }
}
