import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {LoginService} from '../common/services/login.service';
import {LocalStorageService} from '../common/services/local-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public urlClass = [];
  public loginLoading = false;
  // 表单
  public myFromModule: FormGroup;
  public formUsername: any;
  public formPassword: any;

  constructor(
    private fb: FormBuilder,
    private route: Router,
    private loginService: LoginService,
    private localSessionStorage: LocalStorageService
  ) {
  }

  ngOnInit() {
    this.myFromModule = this.fb.group({
      userName: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
    this.formUsername = this.myFromModule.get('userName');
    this.formPassword = this.myFromModule.get('password');
  }

//  登陆
  public onSubmit() {
    this.loginLoading = true;
    if (this.myFromModule.valid) {
      this.loginService.getLogin(this.myFromModule.value).subscribe(
        (value) => {
          if (value.status === '200') {
            this.localSessionStorage.setObject('clientIP', value.message);
            // 初始化路由信息
            this.loginService.getRouter(value.data.authentication.accessToken).subscribe(
              (routerInfo) => {
                if (routerInfo.status === '200') {
                  routerInfo.data.routers.map((item) => {
                    this.urlClass.push(item.split('/')[2]);
                  });
                  value.data.urlClass = this.urlClass;
                  value.data.urlList =  routerInfo.data.menuAscxs;
                  // 本地存储信息
                  for (const prop in value.data) {
                    if (value.data.hasOwnProperty(prop)) {
                      this.localSessionStorage.setObject(prop, value.data[prop]);
                    }
                  }
                  this.loginLoading = false;
                  this.route.navigate([value.data.homePageRoute]);
                } else {
                  window.alert('初始化菜单失败');
                }
              });
          }
          else {
            this.localSessionStorage.loading.next({display: false});
            window.alert(value.message);
          }
        });
    } else {
      window.alert('请输入合法的用户名和密码');
    }
  }
  // 插件下载
  public vlcDownload() {
    window.open('http://139.9.155.62/plc/vlc-3.0.4-win32.exe');
  }
}
