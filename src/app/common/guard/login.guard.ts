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
    if (this.localSessionStorage.get('accessToken')) {
      return true;
    }
    else {
      this.router.navigate(['/remind']);
      return false;
    }
  }
}
