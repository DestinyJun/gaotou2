import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {NgxEchartsService} from 'ngx-echarts';

@Component({
  selector: 'app-echart-province-person',
  templateUrl: './echart-province-person.component.html',
  styleUrls: ['./echart-province-person.component.css']
})
export class EchartProvincePersonComponent implements OnInit, OnChanges {
  @Input() public option: any;
  @Input() public width = 'auto';
  @Input() public height: any;
  public optionsPerson: any;
  public echartShow = false;
  constructor(
    private es: NgxEchartsService,
  ) { }

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (!(JSON.stringify(this.option) === '[]')) {
      this.buildEchart();
    } else {
      this.echartShow = true;
    }
  }
  public buildEchart (): void {
   /* const data = [
      {name: '贵阳市', value: 177},
      {name: '六盘水市', value: 42},
      {name: '遵义市', value: 300},
      {name: '安顺市', value: 102},
      {name: '毕节市', value: 47},
      {name: '铜仁市', value: 81},
      {name: '黔西南布依族苗族自治州', value: 300},
      {name: '黔东南苗族侗族自治州', value: 82},
      {name: '黔南布依族苗族自治州', value: 66},
    ];*/
    const data = this.option;
    // 配置
    const max = 480, min = 9;
    const maxSize4Pin = 100, minSize4Pin = 20;
    const mapName = '贵州';
    const geoCoordMap = {};
    const mapFeatures = this.es.getMap(mapName).geoJson.features;
    mapFeatures.forEach(function(v) {
      // 地区名称
      const name = v.properties.name;
      // 地区经纬度
      geoCoordMap[name] = v.properties.cp;
    });
    const convertData = function (datas) {
      const res = [];
      for (let i = 0; i < datas.length; i++) {
        const geoCoord = geoCoordMap[datas[i].name];
        if (geoCoord) {
          res.push({
            name: datas[i].name,
            value: geoCoord.concat(datas[i].value),
          });
        }
      }
      return res;
    };
    // 数据对象
    this.optionsPerson = {
      tooltip: {
        trigger: 'item',
        formatter: function (params) {
          if (typeof(params.value)[2] === 'undefined') {
            let toolTiphtml = '';
            for (let i = 0; i < data.length; i++) {
              if (params.name === data[i].name) {
                toolTiphtml += `${data[i].name}：${data[i].value}人/次`;
              }
            }
            return toolTiphtml;
          } else {
            let toolTiphtml = '';
            for (let i = 0; i < data.length; i++) {
              if (params.name === data[i].name) {
                toolTiphtml += `${data[i].name}：${data[i].value}人/次`;
              }
            }
            return toolTiphtml;
          }
        }
      },
      visualMap: {
        show: true,
        min: 0,
        max: 3000,
        left: 'left',
        top: 'bottom',
        text: ['高', '低'], // 文本，默认为数值文本
        calculable: true,
        seriesIndex: [1],
        inRange: {
          // color: ['#3B5077', '#031525'] // 蓝黑
          // color: ['#ffc0cb', '#800080'] // 红紫
          // color: ['#3C3B3F', '#605C3C'] // 黑绿
          // color: ['#0f0c29', '#302b63', '#24243e'] // 黑紫黑
          // color: ['#23074d', '#cc5333'] // 紫红
          color: ['#00467F', '#A5CC82'] // 蓝绿
          // color: ['#1488CC', '#2B32B2'] // 浅蓝
          // color: ['#00467F', '#A5CC82'] // 蓝绿
          // color: ['#00467F', '#A5CC82'] // 蓝绿
          // color: ['#00467F', '#A5CC82'] // 蓝绿
          // color: ['#00467F', '#A5CC82'] // 蓝绿

        },
        textStyle: {
          color: 'white'
        }
      },
      geo: {
        show: true,
        map: mapName,
        label: {
          normal: {
            show: false
          },
          emphasis: {
            show: false,
          }
        },
        roam: true,
        itemStyle: {
          normal: {
            areaColor: '#031525',
            borderColor: '#3B5077',
          },
          emphasis: {
            areaColor: '#2B91B7',
          }
        }
      },
      series: [
        {
          name: '散点',
          type: 'scatter',
          coordinateSystem: 'geo',
          data: convertData(data),
          symbolSize: function (val) {
            if (val[2] === 0) {
              return 1;
            }
            // return val[2] / 10;
            return 10;
          },
          label: {
            normal: {
              formatter: function (params) {
                return params.name;
              },
              position: 'right',
              show: true
            },
            emphasis: {
              show: true
            }
          },
          itemStyle: {
            normal: {
              color: '#05C3F9'
            }
          }
        },
        {
          type: 'map',
          map: mapName,
          geoIndex: 0,
          aspectScale: 0.75, // 长宽比
          showLegendSymbol: false, // 存在legend时显示
          label: {
            normal: {
              show: true
            },
            emphasis: {
              show: false,
              textStyle: {
                color: '#fff'
              }
            }
          },
          roam: true,
          itemStyle: {
            normal: {
              areaColor: '#031525',
              borderColor: '#3B5077',
            },
            emphasis: {
              areaColor: '#2B91B7'
            }
          },
          animation: false,
          data: data
        },
        {
          name: '点',
          type: 'scatter',
          coordinateSystem: 'geo',
          symbol: 'pin', // 气 泡
          symbolSize: function (val) {
            if (val[2] === 0) {
              return 0;
            }
            // const a = (maxSize4Pin - minSize4Pin) / (max - min);
            // const b = minSize4Pin - a * min;
            // const b = maxSize4Pin - a * max;
            // return a * val[2] + b;
            return 40;
          },
          label: {
            normal: {
              formatter: function (params) {
                return params.value[2];
              },
              show: true,
              textStyle: {
                color: '#fff',
                fontSize: 9,
              }
            }
          },
          itemStyle: {
            normal: {
              color: '#F62157', // 标志颜色
            }
          },
          zlevel: 6,
          data: convertData(data),
        },
      ]
    };
  }
}
