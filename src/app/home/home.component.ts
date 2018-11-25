import {
  Component,
  OnInit
} from '@angular/core';
import {EventsService} from '../common/services/events.service';
import {ToolsService} from '../common/services/tools.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  // 搜索
  public searchForm: FormGroup;
  public selectForm: FormGroup;

  constructor(
    private eventsService: EventsService,
    private fb: FormBuilder,
    private route: Router
  ) {
  }

  ngOnInit() {
    this.buildForm();
  }



  // 搜索的创建表单
  public buildForm(): void {
    this.searchForm = this.fb.group({
      searchText: ['', [Validators.required]]
    });
    this.selectForm = this.fb.group({
      province: ['', [Validators.required]],
      city: ['', [Validators.required]],
      serZone: ['', [Validators.required]]
    });
  }

  public searchArea(): void {
    if (this.searchForm.valid) {
      console.log(this.searchForm.value);
    } else {
      window.alert('请输入服务区名称');
    }
  }

  public selectArea(): void {
    if (this.selectForm.value.province === '贵州省' && this.selectForm.value.city === '贵阳市' && this.selectForm.value.serZone === '久长服务区') {
      this.route.navigate(['/home/serzone', {name: this.selectForm.value.serZone}]);
    } else if (this.selectForm.value.province === '贵州省' && this.selectForm.value.city === '贵阳市') {
      this.route.navigate(['/home/city', {name: this.selectForm.value.city}]);
    } else if (this.selectForm.value.province === '贵州省') {
      console.log(1);
      this.route.navigate(['/home/finance']);
    }
  }
}
