import {Component, OnInit} from '@angular/core';
import {environment} from '../environments/environment';
import {GlobalService} from './common/services/global.service';
import {LocalStorageService} from './common/services/local-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  public display: boolean;
  constructor(
    private localSessionStorage: LocalStorageService
  ) {
    console.log('当前产品状态是：' + environment.weixin);
  }
  ngOnInit(): void {
    this.localSessionStorage.loading.subscribe(
      (value) => {
        this.display = value.display;
      }
    );
  }
}
