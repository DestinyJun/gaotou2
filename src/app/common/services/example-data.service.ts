import { Injectable } from '@angular/core';

@Injectable()
export class ExampleDataService {
  constructor() { }
  // 返回折线图数据年数据
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
  // 返回折线图数据年数据
  public getProvinceBarYearData(): any {
    const year = ['2015年', '2016年', '2017年', '2018年', '2019年'];
    return {
      xData: year,
      coordinate: this.getRandomData(year, 0, 10000)
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

}
