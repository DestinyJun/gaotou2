import { Injectable } from '@angular/core';

@Injectable()
export class ExampleDataService {
  constructor() { }
  // 返回折线图年数据
  public getProvinceLineYearData(): any {
    const year = ['2015年', '2016年', '2017年', '2018年', '2019年'];
    return {
      xData: year,
      yData: [
        {
          code: 'revenue',
          data: this.getRandomData(year, 25000, 30000),
          name: '经营收入'
        },
        {
          code: 'passenger',
          data: this.getRandomData(year, 20000, 25000),
          name: '客流量'
        },
        {
          code: 'vehicle',
          data: this.getRandomData(year, 10000, 15000),
          name: '车流量'
        },
        {
          code: 'electric',
          data: this.getRandomData(year, 5000, 10000),
          name: '用电量'
        },
        {
          code: 'water',
          data: this.getRandomData(year, 3000, 6000),
          name: '用水量'
        },
        {
          code: 'washing_out',
          data: this.getRandomData(year, 0, 1000),
          name: '排污量'
        },
      ]
    };
  }
  // 返回柱状图年数据
  public getProvinceBarYearData(): any {
    const year = ['2015年', '2016年', '2017年', '2018年', '2019年'];
    return {
      xData: year,
      coordinate: this.getRandomData(year, 0, 10000)
    };
  }
  // 返回地区排名横向柱状图年数据
  public getCityCrosswiseBarYearData(): any {
    const year = [
      {serviceAreaId: 16, serviceName: '2015年'},
      {serviceAreaId: 32, serviceName: '2016年'},
      {serviceAreaId: 32, serviceName: '2017年'},
      {serviceAreaId: 32, serviceName: '2018年'},
      {serviceAreaId: 8, serviceName: '2019年'},
    ];
    return {
      barDatas: [
        {title: '用水量', titleCode: 'water', datas: this.bubbleSortBig(this.getRandomData(year, 0, 20000))},
        {title: '用电量', titleCode: 'electricity', datas: this.bubbleSortBig(this.getRandomData(year, 0, 18000))},
        {title: '排污量', titleCode: 'pollution', datas: this.bubbleSortBig(this.getRandomData(year, 0, 16000))}
      ],
      yAxis: year,
    };
  }
  // 返回服务区排名横向柱状图年数据
  public getServiceCrosswiseBarYearData(): any {
    const year = [
      {serviceAreaId: 16, serviceName: '吊堡停车区'},
      {serviceAreaId: 32, serviceName: '龙山停车区'},
      {serviceAreaId: 8, serviceName: '子为停车区'},
      {serviceAreaId: 6, serviceName: '上堡服务区'},
      {serviceAreaId: 9, serviceName: '新寨服务区'},
      {serviceAreaId: 4, serviceName: '牟珠洞服务区'},
      {serviceAreaId: 36, serviceName: '楠木渡服务区'},
      {serviceAreaId: 5, serviceName: '都匀北停车区'},
      {serviceAreaId: 111, serviceName: '红枫湖服务区'},
      {serviceAreaId: 1, serviceName: '久长服务区'}
    ];
    return {
      barDatas: [
        {title: '用水量', titleCode: 'water', datas: this.bubbleSortBig(this.getRandomData(year, 0, 10000))},
        {title: '用电量', titleCode: 'electricity', datas: this.bubbleSortBig(this.getRandomData(year, 0, 9000))},
        {title: '排污量', titleCode: 'pollution', datas: this.bubbleSortBig(this.getRandomData(year, 0, 8000))}
      ],
      yAxis: year,
    };
  }

  // 返回折线图数据月数据
  public getProvinceLineMonthData(): any {
    const month = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'];
    return {
      xData: month,
      yData: [
        {
          code: 'revenue',
          data: this.getRandomData(month, 25000, 30000),
          name: '经营收入'
        },
        {
          code: 'passenger',
          data: this.getRandomData(month, 20000, 25000),
          name: '客流量'
        },
        {
          code: 'vehicle',
          data: this.getRandomData(month, 10000, 15000),
          name: '车流量'
        },
        {
          code: 'electric',
          data: this.getRandomData(month, 5000, 10000),
          name: '用电量'
        },
        {
          code: 'water',
          data: this.getRandomData(month, 3000, 6000),
          name: '用水量'
        },
        {
          code: 'washing_out',
          data: this.getRandomData(month, 0, 1000),
          name: '排污量'
        },
      ]
    };
  }
  // 返回折线图数据月数据
  public getProvinceBarMonthData(): any {
    const month = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'];
    return {
      xData: month,
      coordinate: this.getRandomData(month, 0, 10000)
    };
  }
  // 返回地区排名横向柱状图月数据
  public getCityCrosswiseBarMonthData(): any {
    const year = [
      {serviceAreaId: 32, serviceName: '六盘水市'},
      {serviceAreaId: 32, serviceName: '遵义市'},
      {serviceAreaId: 32, serviceName: '安顺市'},
      {serviceAreaId: 8, serviceName: '铜仁市'},
      {serviceAreaId: 35, serviceName: '黔西南州'},
      {serviceAreaId: 6, serviceName: '毕节市'},
      {serviceAreaId: 9, serviceName: '黔东南州'},
      {serviceAreaId: 4, serviceName: '黔南州'},
      {serviceAreaId: 16, serviceName: '贵阳市'},
    ];
    return {
      barDatas: [
        {title: '用水量', titleCode: 'water', datas: this.bubbleSortBig(this.getRandomData(year, 0, 15000))},
        {title: '用电量', titleCode: 'electricity', datas: this.bubbleSortBig(this.getRandomData(year, 0, 14000))},
        {title: '排污量', titleCode: 'pollution', datas: this.bubbleSortBig(this.getRandomData(year, 0, 13000))}
      ],
      yAxis: year,
    };
  }
  // 返回服务区排名横向柱状图月数据
  public getServiceCrosswiseBarMonthData(): any {
    const year = [
      {serviceAreaId: 16, serviceName: '吊堡停车区'},
      {serviceAreaId: 32, serviceName: '龙山停车区'},
      {serviceAreaId: 8, serviceName: '子为停车区'},
      {serviceAreaId: 6, serviceName: '上堡服务区'},
      {serviceAreaId: 9, serviceName: '新寨服务区'},
      {serviceAreaId: 4, serviceName: '牟珠洞服务区'},
      {serviceAreaId: 36, serviceName: '楠木渡服务区'},
      {serviceAreaId: 5, serviceName: '都匀北停车区'},
      {serviceAreaId: 111, serviceName: '红枫湖服务区'},
      {serviceAreaId: 1, serviceName: '久长服务区'}
    ];
    return {
      barDatas: [
        {title: '用水量', titleCode: 'water', datas: this.bubbleSortBig(this.getRandomData(year, 0, 9000))},
        {title: '用电量', titleCode: 'electricity', datas: this.bubbleSortBig(this.getRandomData(year, 0, 8000))},
        {title: '排污量', titleCode: 'pollution', datas: this.bubbleSortBig(this.getRandomData(year, 0, 7000))}
      ],
      yAxis: year,
    };
  }

  // 返回折线图数据日数据
  public getProvinceLineDayData(): any {
    const day = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11',
      '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22',
      '23', '24', '25', '26', '27', '28', '29', '30', '31'];
    return {
      xData: day,
      yData: [
        {
          code: 'revenue',
          data: this.getRandomData(day, 25000, 30000),
          name: '经营收入'
        },
        {
          code: 'passenger',
          data: this.getRandomData(day, 20000, 25000),
          name: '客流量'
        },
        {
          code: 'vehicle',
          data: this.getRandomData(day, 10000, 15000),
          name: '车流量'
        },
        {
          code: 'electric',
          data: this.getRandomData(day, 5000, 10000),
          name: '用电量'
        },
        {
          code: 'water',
          data: this.getRandomData(day, 3000, 6000),
          name: '用水量'
        },
        {
          code: 'washing_out',
          data: this.getRandomData(day, 0, 1000),
          name: '排污量'
        },
      ]
    };
  }
  // 返回折线图数据日数据
  public getProvinceBarDayData(): any {
    const day = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11',
      '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22',
      '23', '24', '25', '26', '27', '28', '29', '30', '31'];
    return {
      xData: day,
      coordinate: this.getRandomData(day, 0, 10000)
    };
  }
  // 返回地区排名横向柱状图日数据
  public getCityCrosswiseBarDayData(): any {
    const year = [
      {serviceAreaId: 16, serviceName: '贵阳市'},
      {serviceAreaId: 32, serviceName: '六盘水市'},
      {serviceAreaId: 32, serviceName: '遵义市'},
      {serviceAreaId: 32, serviceName: '安顺市'},
      {serviceAreaId: 8, serviceName: '铜仁市'},
      {serviceAreaId: 35, serviceName: '黔西南州'},
      {serviceAreaId: 6, serviceName: '毕节市'},
      {serviceAreaId: 9, serviceName: '黔东南州'},
      {serviceAreaId: 4, serviceName: '黔南州'},
    ];
    return {
      barDatas: [
        {title: '用水量', titleCode: 'water', datas: this.bubbleSortBig(this.getRandomData(year, 0, 18000))},
        {title: '用电量', titleCode: 'electricity', datas: this.bubbleSortBig(this.getRandomData(year, 0, 17000))},
        {title: '排污量', titleCode: 'pollution', datas: this.bubbleSortBig(this.getRandomData(year, 0, 16000))}
      ],
      yAxis: year,
    };
  }
  // 返回服务区排名横向柱状图日数据
  public getServiceCrosswiseBarDayData(): any {
    const year = [
      {serviceAreaId: 16, serviceName: '吊堡停车区'},
      {serviceAreaId: 32, serviceName: '龙山停车区'},
      {serviceAreaId: 8, serviceName: '子为停车区'},
      {serviceAreaId: 6, serviceName: '上堡服务区'},
      {serviceAreaId: 9, serviceName: '新寨服务区'},
      {serviceAreaId: 4, serviceName: '牟珠洞服务区'},
      {serviceAreaId: 36, serviceName: '楠木渡服务区'},
      {serviceAreaId: 5, serviceName: '都匀北停车区'},
      {serviceAreaId: 111, serviceName: '红枫湖服务区'},
      {serviceAreaId: 1, serviceName: '久长服务区'}
    ];
    return {
      barDatas: [
        {title: '用水量', titleCode: 'water', datas: this.bubbleSortBig(this.getRandomData(year, 0, 8000))},
        {title: '用电量', titleCode: 'electricity', datas: this.bubbleSortBig(this.getRandomData(year, 0, 7000))},
        {title: '排污量', titleCode: 'pollution', datas: this.bubbleSortBig(this.getRandomData(year, 0, 6000))}
      ],
      yAxis: year,
    };
  }

  // 返回小时数据
  public getProvinceLineHourData(): any {
    const hour = ['00:00', '02:00', '04:00', '06:00', '08:00', '10:00',
      '12:00', '14:00', '16:00', '18:00', '20:00', '22:00'];
    return {
      xData: hour,
      yData: [
        {
          code: 'revenue',
          data: this.getRandomData(hour, 25000, 30000),
          name: '经营收入'
        },
        {
          code: 'passenger',
          data: this.getRandomData(hour, 20000, 25000),
          name: '客流量'
        },
        {
          code: 'vehicle',
          data: this.getRandomData(hour, 10000, 15000),
          name: '车流量'
        },
        {
          code: 'electric',
          data: this.getRandomData(hour, 5000, 10000),
          name: '用电量'
        },
        {
          code: 'water',
          data: this.getRandomData(hour, 3000, 6000),
          name: '用水量'
        },
        {
          code: 'washing_out',
          data: this.getRandomData(hour, 0, 1000),
          name: '排污量'
        },
      ]
    };
  }
  public getProvinceBarHourData(): any {
    const hour = ['00:00', '02:00', '04:00', '06:00', '08:00', '10:00',
      '12:00', '14:00', '16:00', '18:00', '20:00', '22:00'];
    return {
      xData: hour,
      coordinate: this.getRandomData(hour, 0, 10000)
    };
  }
  // 返回地区排名横向柱状图小时数据
  public getCityCrosswiseBarHourData(): any {
    const year = [
      {serviceAreaId: 16, serviceName: '贵阳市'},
      {serviceAreaId: 32, serviceName: '六盘水市'},
      {serviceAreaId: 32, serviceName: '遵义市'},
      {serviceAreaId: 32, serviceName: '安顺市'},
      {serviceAreaId: 8, serviceName: '铜仁市'},
      {serviceAreaId: 35, serviceName: '黔西南州'},
      {serviceAreaId: 6, serviceName: '毕节市'},
      {serviceAreaId: 9, serviceName: '黔东南州'},
      {serviceAreaId: 4, serviceName: '黔南州'},
    ];
    return {
      barDatas: [
        {title: '用水量', titleCode: 'water', datas: this.bubbleSortBig(this.getRandomData(year, 0, 8000))},
        {title: '用电量', titleCode: 'electricity', datas: this.bubbleSortBig(this.getRandomData(year, 0, 7000))},
        {title: '排污量', titleCode: 'pollution', datas: this.bubbleSortBig(this.getRandomData(year, 0, 6000))}
      ],
      yAxis: year,
    };
  }
  // 返回服务区排名横向柱状图小时数据
  public getServiceCrosswiseBarHourData(): any {
    const year = [
      {serviceAreaId: 16, serviceName: '吊堡停车区'},
      {serviceAreaId: 32, serviceName: '龙山停车区'},
      {serviceAreaId: 8, serviceName: '子为停车区'},
      {serviceAreaId: 6, serviceName: '上堡服务区'},
      {serviceAreaId: 9, serviceName: '新寨服务区'},
      {serviceAreaId: 4, serviceName: '牟珠洞服务区'},
      {serviceAreaId: 36, serviceName: '楠木渡服务区'},
      {serviceAreaId: 5, serviceName: '都匀北停车区'},
      {serviceAreaId: 111, serviceName: '红枫湖服务区'},
      {serviceAreaId: 1, serviceName: '久长服务区'}
    ];
    return {
      barDatas: [
        {title: '用水量', titleCode: 'water', datas: this.bubbleSortBig(this.getRandomData(year, 0, 5000))},
        {title: '用电量', titleCode: 'electricity', datas: this.bubbleSortBig(this.getRandomData(year, 0, 4000))},
        {title: '排污量', titleCode: 'pollution', datas: this.bubbleSortBig(this.getRandomData(year, 0, 3000))}
      ],
      yAxis: year,
    };
  }


  // 返回一个随机整数,包括最大值及最小值
  public getRandomIntInclusive (min, max): any {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  // 根据数据生成一个含有最大值最小值的随机数组
  public getRandomData (array, min, max): any {
    const data = [];
    array.map((val) => {
      data.push(this.getRandomIntInclusive(min, max));
    });
    return data;
  }

  /**********************工具类************************/
  // 冒泡排序从大到小
  public bubbleSortSmall(arry): any {
    let i = arry.length - 1;
    while (i > 0) {
      let pos = 0;
      for (let j = 0; j < i; j++) {
        if (arry[j] < arry[j + 1]) {
          pos = j;
          const tmp = arry[j];
          arry[j] = arry[j + 1];
          arry[j + 1] = tmp;
        }
      }
      i = pos;
    }
    return arry;
  }

  // 冒泡排序从小到大
  public bubbleSortBig(arry): any {
    let i = arry.length - 1;
    while (i > 0) {
      let pos = 0;
      for (let j = 0; j < i; j++) {
        if (arry[j] > arry[j + 1]) {
          pos = j;
          const tmp = arry[j];
          arry[j] = arry[j + 1];
          arry[j + 1] = tmp;
        }
      }
      i = pos;
    }
    return arry;
  }
}
