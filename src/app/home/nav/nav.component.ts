import {Component, HostListener, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {GlobalService} from '../../common/services/global.service';
import {HttpClient} from '@angular/common/http';
import {LocalStorageService} from '../../common/services/local-storage.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  public urlList: any;
  public urlIcon = ['fa fa-area-chart', 'fa fa-bar-chart', 'fa fa-line-chart', 'fa fa-video-camera', 'fa fa-pie-chart', 'fa fa-server'];
  public navOpacity = '0.4';
  public navHeight = '50px';
  @HostListener('mouseenter') onMouserEnter() {
    this.navOpacity = '1';
    this.navHeight = 'auto';
  }
  @HostListener('mouseleave') onMouserLeave() {
    this.navOpacity = '0.4';
    this.navHeight = '50px';
  }
  @HostListener('mouseenter') onClick() {
    if (this.navOpacity === '1') {
      this.navOpacity = '0.4';
      this.navHeight = '50px';
    } else if (this.navOpacity === '0.4') {
      this.navOpacity = '1';
      this.navHeight = 'auto';
    }
  }
  constructor(
    private router: Router,
    private globalService: GlobalService,
    private localSessionStorage: LocalStorageService,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.http.get(`${this.globalService.urla}/authenticator/init/business/accessToken/${this.globalService.accessToken}`).subscribe(
      (value) => {
        let a: any;
        a = value;
        console.log(a.status);
        if (a.status === '200') {
          this.urlList = a.data.menuAscxs;
          console.log(this.urlList);
        } else {
          window.alert('初始化菜单失败');
        }
      }
    );
  }
  public wholeClick(): void {
    this.router.navigate(['home/whole']);
  }
  public financeClick(): void {
    this.router.navigate(['home/finance']);
  }
  public cityClick(): void {
    this.router.navigate(['home/city']);
  }
  public serzoneClick(): void {
    this.router.navigate(['home/serzone', {name: '久长服务区', point: [116.39737, 39.935076]}]);
  }
  public videowClick(): void {
    this.router.navigate(['home/videow']);
  }
}
