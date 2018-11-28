import { Component, OnInit } from '@angular/core';
import {LocalStorageService} from '../../common/services/local-storage.service';
import {UpdatePassword, UpdateUser, User} from '../../common/model/personal.model';
import {DatePipe} from '@angular/common';
import {PersonalService} from '../../common/services/personal.service';

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.css']
})
export class PersonalComponent implements OnInit {
  public value: Date; // 时间选择器
  public  esDate: any; // 时间名称初始化
  // 实时客流量
  public persons = [];
  // btn状态值判断
  public btnProfileTxt = true;
  public btnPasswordTxt = true;
  public userInfo: User = new User;
  public confirmPassword: any;
  public updateUser = new UpdateUser('', '', '', '', '', '', '');
  public updatePassword = new UpdatePassword('', '', '');
  constructor(
    private personalService: PersonalService,
    private localService: LocalStorageService,
    private datePipe: DatePipe
  ) { }

  ngOnInit() {
    this.userInfo = JSON.parse(this.localService.userSessionStorage.userDTO);
    console.log(this.userInfo);
    // 发射实时客流
    this.getPerson();
    // 发射业太数据名称
    this.localService.eventBus.next({title: '全国高速视频监控大数据', flagState: 'personal', flagName: '全国'});
    // 时间初始化
    this.esDate = {
      firstDayOfWeek: 0,
      dayNames: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
      dayNamesShort: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
      dayNamesMin: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
      monthNames: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
      monthNamesShort: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
      today: '今天',
      clear: '清除'
    };
  }
  // 客流
  public getPerson(): void {
    this.localService.persons.next(this.persons);
  }
  // 选择日期
  public onSelectTime(event): void {
    this.updateUser.birthday = this.datePipe.transform(event, 'yyyy-mm-dd');
    this.userInfo.birthday = this.datePipe.transform(event, 'yyyy-MM-dd');
  }
  // 更新个人信息
  public updateProfileClick() {
    this.btnProfileTxt = true;
    for (const prop in this.updateUser) {
      if (this.updateUser.hasOwnProperty(prop)) {
        this.updateUser[prop] = this.userInfo[prop];
      }
    }
    console.log(this.updateUser);
    this.personalService.updateProfile(this.updateUser).subscribe(
      (value) => {
        console.log(value);
        if (value.status === '200') {

        }
      }
    );
  }
  public updatePasswordClick() {
    if (this.confirmPassword === this.updatePassword.newPassword) {
      this.updatePassword.userName = this.localService.userSessionStorage.userName;
      this.personalService.updatePassword(this.updatePassword).subscribe(
        (value) => {
          if (value.status === '500') {
            window.confirm(value.message);
          } else if (value.status === '200') {
            window.confirm(value.message);
            this.btnPasswordTxt = true;
          }
        }
      );
    } else {
      window.confirm('两处输入的密码不一致，请重新输入');
    }
  }
  public logOut(): void {
    this.localService.userSessionStorage = {};
  }
}
