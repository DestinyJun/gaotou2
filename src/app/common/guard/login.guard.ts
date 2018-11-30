import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {LocalStorageService} from '../services/local-storage.service';

@Injectable()
export class LoginGuard implements CanActivate {
  constructor (
    private localSessionStorage: LocalStorageService,
    private router: Router
  ) {}
  canActivate() {
    if (this.localSessionStorage.getObject('authentication').accessToken) {
      return true;
    } else {
      this.router.navigate(['/remind']);
      return false;
    }
  }
}
