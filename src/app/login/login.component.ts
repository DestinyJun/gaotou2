import { Component, OnInit } from '@angular/core';
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
  // 表单
  public myFromModule: FormGroup;
  public formUsername: any;
  public formPassword: any;
  constructor(
    private fb: FormBuilder,
    private route: Router,
    private loginService: LoginService,
    private localSessionStorage: LocalStorageService
  ) { }

  ngOnInit() {
    this.myFromModule = this.fb.group({
      userName: ['', [Validators.required]],
      password: ['' , [Validators.required]]
    });
    this.formUsername = this.myFromModule.get('userName');
    this.formPassword = this.myFromModule.get('password');
  }

//  登陆
  public onSubmit() {
    if (this.myFromModule.valid) {
      this.loginService.getLogin(this.myFromModule.value).subscribe(
        (value) => {
          this.localSessionStorage.loading.next({display: true});
          if (value.status === '200') {
            this.localSessionStorage.loading.next({display: false});
            // 本地存储信息
            for ( const prop in value.data) {
              if (value.data.hasOwnProperty(prop)) {
                this.localSessionStorage.setObject(prop, value.data[prop]);
              }
            }
            this.route.navigate([value.data.homePageRoute]);
          } else {
            window.alert(value.message);
          }
      });
    } else {
      window.alert('请输入合法的用户名和密码');
    }
  }
}
