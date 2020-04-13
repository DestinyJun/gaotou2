import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {ApiService} from '../common/services/api.service';
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
    private apiSrv: ApiService,
    private localSessionStorage: LocalStorageService
  ) {}

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
      this.apiSrv.getLogin(this.myFromModule.value).subscribe(
        (value) => {
          this.loginLoading = false;
          this.localSessionStorage.set('accessToken', value.key);
          this.localSessionStorage.set('companyId', value.companyId);
          this.route.navigate(['/home/whole']);
        });
    } else {
      this.loginLoading = false;
      window.alert('请输入合法的用户名和密码');
    }
  }
  // 插件下载
  public vlcDownload() {
    window.open('http://139.9.155.62/plc/vlc-3.0.4-win32.exe');
  }
}
