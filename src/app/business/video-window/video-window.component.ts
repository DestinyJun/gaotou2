import { Component, OnInit } from '@angular/core';
import {NodeEvent, NodeMenuItemAction, TreeModel} from 'ng2-tree';
import {VideoWindowService} from '../../common/services/video-window.service';
import {LocalStorageService} from '../../common/services/local-storage.service';
@Component({
  selector: 'app-video-window',
  templateUrl: './video-window.component.html',
  styleUrls: ['./video-window.component.css']
})
export class VideoWindowComponent implements OnInit {
  // 实时客流量
  public personNum = 2000;
  public persons = [];
  public videoUrl1: string;
  public videoUrl2: string;
  public videoUrl3: string;
  public videoUrl4: string;
  public videoLocation1: any;
  public videoLocation2: any;
  public videoLocation3: any;
  public videoLocation4: any;
  /**************  ng2-tree ************/
  public tree: TreeModel;
  public tree1: TreeModel;
  constructor(
    private videoWindowService: VideoWindowService,
    private localService: LocalStorageService
  ) { }

  ngOnInit() {
    // 发射实时客流
    this.localService.persons.next(this.persons);
    // 发射业太数据名称
    this.localService.eventBus.next('全国高速视频监控大数据');
    this.localService.eventBus.next({title: '全国高速视频监控大数据',  flagState: 'window', flagName: '全国'});
    this.videoLocation1 = '';
    this.videoLocation2 = '';
    this.videoLocation3 = '';
    this.videoLocation4 = '';
    this.getUploadDate();
    this.tree = {
      value: '贵州高速服务区监控',
      settings: {
        static: true, // 禁止拖动以及右键删除修改菜单
        isCollapsedOnInit: true, // 设置隐藏与展开
        leftMenu: false, // 左菜单栏
        cssClasses: {
          expanded: 'fa fa-caret-down',
          collapsed: 'fa fa-caret-right',
          leaf: 'fa',
          empty: 'fa fa-caret-right disabled'
        },
        templates: {
          leaf: '<i class="fa fa-file-o"></i>',
          leftMenu: '<i class="fa fa-navicon"></i>'
        },
        menuItems: [
          { action: NodeMenuItemAction.Custom, name: 'Foo', cssClass: 'fa fa-arrow-right' },
          { action: NodeMenuItemAction.Custom, name: 'Bar', cssClass: 'fa fa-arrow-right' },
          { action: NodeMenuItemAction.Custom, name: 'Baz', cssClass: 'fa fa-arrow-right'}
        ]
      },
      children: [
        {
          value: '一号监视窗',
          children: [
            {
              value: '遵义市',
              children: [
                { value: '乌江高速服务区',   children: [
                    {value: '高速上行', children: [
                        {value: '1楼楼梯口', id: 1, place: '1', url: 'rtsp://admin:12345@58.42.229.135:33335/Streaming/Channels/102?transportmode-unicast'},
                        {value: '转弯楼道', id: 2, place: '2', url: 'rtsp://admin:12345a@222.85.147.216:554/Streaming/Channels/102?transportmode-unicast'},
                        {value: '厕所旁边', id: 3, place: '3', url: 'rtsp://admin:12345a@222.85.147.216:554/Streaming/Channels/202?transportmode-unicast'},
                        {value: '马路口', id: 4, place: '4', url: 'rtsp://admin:12345a@222.85.147.216:554/Streaming/Channels/302?transportmode-unicast'}
                      ]},
                    {value: '高速下行', children: [
                        {value: '二楼餐厅', id: 1, place: '1', url: 'rtsp://admin:12345a@222.85.147.216:554/Streaming/Channels/102?transportmode-unicast'},
                        {value: '办公室', id: 2, place: '2', url: 'rtsp://admin:12345@58.42.229.135:33335/Streaming/Channels/102?transportmode-unicast'},
                        {value: '3楼楼梯口', id: 3, place: '3', url: 'rtsp://admin:12345@58.42.229.135:33335/Streaming/Channels/102?transportmode-unicast'},
                        {value: '4楼楼梯口', id: 4, place: '4', url: 'rtsp://admin:12345@58.42.229.135:33335/Streaming/Channels/102?transportmode-unicast'}
                      ]},
                  ] },
                { value: '仁怀高速服务区',   children: [
                    {value: '生产线1', children: [
                        {value: '1楼楼梯口', id: 1, place: '1', url: 'rtsp://admin:12345@58.42.229.135:33335/Streaming/Channels/102?transportmode-unicast'},
                        {value: '2楼楼梯口', id: 2, place: '2', url: 'rtsp://admin:12345@58.42.229.135:33335/Streaming/Channels/102?transportmode-unicast'},
                        {value: '3楼楼梯口', id: 3, place: '3', url: 'rtsp://admin:12345@58.42.229.135:33335/Streaming/Channels/102?transportmode-unicast'},
                        {value: '4楼楼梯口', id: 4, place: '4', url: 'rtsp://admin:12345@58.42.229.135:33335/Streaming/Channels/102?transportmode-unicast'}
                      ]},
                    {value: '生产线2', children: [
                        {value: '1楼楼梯口', id: 1, place: '1', url: 'rtsp://admin:12345@58.42.229.135:33335/Streaming/Channels/102?transportmode-unicast'},
                        {value: '2楼楼梯口', id: 2, place: '2', url: 'rtsp://admin:12345@58.42.229.135:33335/Streaming/Channels/102?transportmode-unicast'},
                        {value: '3楼楼梯口', id: 3, place: '3', url: 'rtsp://admin:12345@58.42.229.135:33335/Streaming/Channels/102?transportmode-unicast'},
                        {value: '4楼楼梯口', id: 4, place: '4', url: 'rtsp://admin:12345@58.42.229.135:33335/Streaming/Channels/102?transportmode-unicast'}
                      ]},
                    {value: '生产线2', children: [
                        {value: '1楼楼梯口', id: 1, place: '1', url: 'rtsp://admin:12345@58.42.229.135:33335/Streaming/Channels/102?transportmode-unicast'},
                        {value: '2楼楼梯口', id: 2, place: '2', url: 'rtsp://admin:12345@58.42.229.135:33335/Streaming/Channels/102?transportmode-unicast'},
                        {value: '3楼楼梯口', id: 3, place: '3', url: 'rtsp://admin:12345@58.42.229.135:33335/Streaming/Channels/102?transportmode-unicast'},
                        {value: '4楼楼梯口', id: 4, place: '4', url: 'rtsp://admin:12345@58.42.229.135:33335/Streaming/Channels/102?transportmode-unicast'}
                      ]}
                  ] },
              ]
            },
            {
              value: '贵阳市',
              settings: {
                static: true,
              },
              children: [
                { value: '三桥高速服务区',   children: [
                    {value: '高速上行', children: [
                        {value: '1楼楼梯口', id: 1, place: '1', url: 'rtsp://admin:12345@58.42.229.135:33335/Streaming/Channels/102?transportmode-unicast'},
                        {value: '2楼楼梯口', id: 2, place: '2', url: 'rtsp://admin:12345@58.42.229.135:33335/Streaming/Channels/102?transportmode-unicast'},
                        {value: '3楼楼梯口', id: 3, place: '3', url: 'rtsp://admin:12345@58.42.229.135:33335/Streaming/Channels/102?transportmode-unicast'},
                        {value: '4楼楼梯口', id: 4, place: '4', url: 'rtsp://admin:12345@58.42.229.135:33335/Streaming/Channels/102?transportmode-unicast'}
                      ]},
                    {value: '高速下行', children: [
                        {value: '1楼楼梯口', id: 1, place: '1', url: 'rtsp://admin:12345@58.42.229.135:33335/Streaming/Channels/102?transportmode-unicast'},
                        {value: '2楼楼梯口', id: 2, place: '2', url: 'rtsp://admin:12345@58.42.229.135:33335/Streaming/Channels/102?transportmode-unicast'},
                        {value: '3楼楼梯口', id: 3, place: '3', url: 'rtsp://admin:12345@58.42.229.135:33335/Streaming/Channels/102?transportmode-unicast'},
                        {value: '4楼楼梯口', id: 4, place: '4', url: 'rtsp://admin:12345@58.42.229.135:33335/Streaming/Channels/102?transportmode-unicast'}
                      ]},
                  ] },
                { value: '龙洞堡高速服务区',   children: [
                    {value: '高速上行', children: [
                        {value: '1楼楼梯口', id: 1, place: '1', url: 'rtsp://admin:12345@58.42.229.135:33335/Streaming/Channels/102?transportmode-unicast'},
                        {value: '2楼楼梯口', id: 2, place: '2', url: 'rtsp://admin:12345@58.42.229.135:33335/Streaming/Channels/102?transportmode-unicast'},
                        {value: '3楼楼梯口', id: 3, place: '3', url: 'rtsp://admin:12345@58.42.229.135:33335/Streaming/Channels/102?transportmode-unicast'},
                        {value: '4楼楼梯口', id: 4, place: '4', url: 'rtsp://admin:12345@58.42.229.135:33335/Streaming/Channels/102?transportmode-unicast'}
                      ]},
                    {value: '高速下行', children: [
                        {value: '1楼楼梯口', id: 1, place: '1', url: 'rtsp://admin:12345@58.42.229.135:33335/Streaming/Channels/102?transportmode-unicast'},
                        {value: '2楼楼梯口', id: 2, place: '2', url: 'rtsp://admin:12345@58.42.229.135:33335/Streaming/Channels/102?transportmode-unicast'},
                        {value: '3楼楼梯口', id: 3, place: '3', url: 'rtsp://admin:12345@58.42.229.135:33335/Streaming/Channels/102?transportmode-unicast'},
                        {value: '4楼楼梯口', id: 4, place: '4', url: 'rtsp://admin:12345@58.42.229.135:33335/Streaming/Channels/102?transportmode-unicast'}
                      ]}
                  ] },
              ]
            }
          ]
        },
        {
          value: '二号监视窗',
          children: [
            {
              value: '遵义市',
              children: [
                { value: '乌江高速服务区',   children: [
                    {value: '高速上行', children: [
                        {value: '1楼楼梯口', id: 1, place: '1', url: 'rtsp://admin:12345@58.42.229.135:33335/Streaming/Channels/102?transportmode-unicast'},
                        {value: '转弯楼道', id: 2, place: '2', url: 'rtsp://admin:12345a@222.85.147.216:554/Streaming/Channels/102?transportmode-unicast'},
                        {value: '厕所旁边', id: 3, place: '3', url: 'rtsp://admin:12345a@222.85.147.216:554/Streaming/Channels/202?transportmode-unicast'},
                        {value: '马路口', id: 4, place: '4', url: 'rtsp://admin:12345a@222.85.147.216:554/Streaming/Channels/302?transportmode-unicast'}
                      ]},
                    {value: '高速下行', children: [
                        {value: '二楼餐厅', id: 1, place: '1', url: 'rtsp://admin:12345a@222.85.147.216:554/Streaming/Channels/102?transportmode-unicast'},
                        {value: '办公室', id: 2, place: '2', url: 'rtsp://admin:12345@58.42.229.135:33335/Streaming/Channels/102?transportmode-unicast'},
                        {value: '3楼楼梯口', id: 3, place: '3', url: 'rtsp://admin:12345@58.42.229.135:33335/Streaming/Channels/102?transportmode-unicast'},
                        {value: '4楼楼梯口', id: 4, place: '4', url: 'rtsp://admin:12345@58.42.229.135:33335/Streaming/Channels/102?transportmode-unicast'}
                      ]},
                  ] },
                { value: '仁怀高速服务区',   children: [
                    {value: '生产线1', children: [
                        {value: '1楼楼梯口', id: 1, place: '1', url: 'rtsp://admin:12345@58.42.229.135:33335/Streaming/Channels/102?transportmode-unicast'},
                        {value: '2楼楼梯口', id: 2, place: '2', url: 'rtsp://admin:12345@58.42.229.135:33335/Streaming/Channels/102?transportmode-unicast'},
                        {value: '3楼楼梯口', id: 3, place: '3', url: 'rtsp://admin:12345@58.42.229.135:33335/Streaming/Channels/102?transportmode-unicast'},
                        {value: '4楼楼梯口', id: 4, place: '4', url: 'rtsp://admin:12345@58.42.229.135:33335/Streaming/Channels/102?transportmode-unicast'}
                      ]},
                    {value: '生产线2', children: [
                        {value: '1楼楼梯口', id: 1, place: '1', url: 'rtsp://admin:12345@58.42.229.135:33335/Streaming/Channels/102?transportmode-unicast'},
                        {value: '2楼楼梯口', id: 2, place: '2', url: 'rtsp://admin:12345@58.42.229.135:33335/Streaming/Channels/102?transportmode-unicast'},
                        {value: '3楼楼梯口', id: 3, place: '3', url: 'rtsp://admin:12345@58.42.229.135:33335/Streaming/Channels/102?transportmode-unicast'},
                        {value: '4楼楼梯口', id: 4, place: '4', url: 'rtsp://admin:12345@58.42.229.135:33335/Streaming/Channels/102?transportmode-unicast'}
                      ]},
                    {value: '生产线2', children: [
                        {value: '1楼楼梯口', id: 1, place: '1', url: 'rtsp://admin:12345@58.42.229.135:33335/Streaming/Channels/102?transportmode-unicast'},
                        {value: '2楼楼梯口', id: 2, place: '2', url: 'rtsp://admin:12345@58.42.229.135:33335/Streaming/Channels/102?transportmode-unicast'},
                        {value: '3楼楼梯口', id: 3, place: '3', url: 'rtsp://admin:12345@58.42.229.135:33335/Streaming/Channels/102?transportmode-unicast'},
                        {value: '4楼楼梯口', id: 4, place: '4', url: 'rtsp://admin:12345@58.42.229.135:33335/Streaming/Channels/102?transportmode-unicast'}
                      ]}
                  ] },
              ]
            },
            {
              value: '贵阳市',
              settings: {
                static: true,
              },
              children: [
                { value: '三桥高速服务区',   children: [
                    {value: '高速上行', children: [
                        {value: '1楼楼梯口', id: 1, place: '1', url: 'rtsp://admin:12345@58.42.229.135:33335/Streaming/Channels/102?transportmode-unicast'},
                        {value: '2楼楼梯口', id: 2, place: '2', url: 'rtsp://admin:12345@58.42.229.135:33335/Streaming/Channels/102?transportmode-unicast'},
                        {value: '3楼楼梯口', id: 3, place: '3', url: 'rtsp://admin:12345@58.42.229.135:33335/Streaming/Channels/102?transportmode-unicast'},
                        {value: '4楼楼梯口', id: 4, place: '4', url: 'rtsp://admin:12345@58.42.229.135:33335/Streaming/Channels/102?transportmode-unicast'}
                      ]},
                    {value: '高速下行', children: [
                        {value: '1楼楼梯口', id: 1, place: '1', url: 'rtsp://admin:12345@58.42.229.135:33335/Streaming/Channels/102?transportmode-unicast'},
                        {value: '2楼楼梯口', id: 2, place: '2', url: 'rtsp://admin:12345@58.42.229.135:33335/Streaming/Channels/102?transportmode-unicast'},
                        {value: '3楼楼梯口', id: 3, place: '3', url: 'rtsp://admin:12345@58.42.229.135:33335/Streaming/Channels/102?transportmode-unicast'},
                        {value: '4楼楼梯口', id: 4, place: '4', url: 'rtsp://admin:12345@58.42.229.135:33335/Streaming/Channels/102?transportmode-unicast'}
                      ]},
                  ] },
                { value: '龙洞堡高速服务区',   children: [
                    {value: '高速上行', children: [
                        {value: '1楼楼梯口', id: 1, place: '1', url: 'rtsp://admin:12345@58.42.229.135:33335/Streaming/Channels/102?transportmode-unicast'},
                        {value: '2楼楼梯口', id: 2, place: '2', url: 'rtsp://admin:12345@58.42.229.135:33335/Streaming/Channels/102?transportmode-unicast'},
                        {value: '3楼楼梯口', id: 3, place: '3', url: 'rtsp://admin:12345@58.42.229.135:33335/Streaming/Channels/102?transportmode-unicast'},
                        {value: '4楼楼梯口', id: 4, place: '4', url: 'rtsp://admin:12345@58.42.229.135:33335/Streaming/Channels/102?transportmode-unicast'}
                      ]},
                    {value: '高速下行', children: [
                        {value: '1楼楼梯口', id: 1, place: '1', url: 'rtsp://admin:12345@58.42.229.135:33335/Streaming/Channels/102?transportmode-unicast'},
                        {value: '2楼楼梯口', id: 2, place: '2', url: 'rtsp://admin:12345@58.42.229.135:33335/Streaming/Channels/102?transportmode-unicast'},
                        {value: '3楼楼梯口', id: 3, place: '3', url: 'rtsp://admin:12345@58.42.229.135:33335/Streaming/Channels/102?transportmode-unicast'},
                        {value: '4楼楼梯口', id: 4, place: '4', url: 'rtsp://admin:12345@58.42.229.135:33335/Streaming/Channels/102?transportmode-unicast'}
                      ]}
                  ] },
              ]
            }
          ]
        },
        {
          value: '三号监视窗',
          children: [
            {
              value: '遵义市',
              children: [
                { value: '乌江高速服务区',   children: [
                    {value: '高速上行', children: [
                        {value: '1楼楼梯口', id: 1, place: '1', url: 'rtsp://admin:12345@58.42.229.135:33335/Streaming/Channels/102?transportmode-unicast'},
                        {value: '转弯楼道', id: 2, place: '2', url: 'rtsp://admin:12345a@222.85.147.216:554/Streaming/Channels/102?transportmode-unicast'},
                        {value: '厕所旁边', id: 3, place: '3', url: 'rtsp://admin:12345a@222.85.147.216:554/Streaming/Channels/202?transportmode-unicast'},
                        {value: '马路口', id: 4, place: '4', url: 'rtsp://admin:12345a@222.85.147.216:554/Streaming/Channels/302?transportmode-unicast'}
                      ]},
                    {value: '高速下行', children: [
                        {value: '二楼餐厅', id: 1, place: '1', url: 'rtsp://admin:12345a@222.85.147.216:554/Streaming/Channels/102?transportmode-unicast'},
                        {value: '办公室', id: 2, place: '2', url: 'rtsp://admin:12345@58.42.229.135:33335/Streaming/Channels/102?transportmode-unicast'},
                        {value: '3楼楼梯口', id: 3, place: '3', url: 'rtsp://admin:12345@58.42.229.135:33335/Streaming/Channels/102?transportmode-unicast'},
                        {value: '4楼楼梯口', id: 4, place: '4', url: 'rtsp://admin:12345@58.42.229.135:33335/Streaming/Channels/102?transportmode-unicast'}
                      ]},
                  ] },
                { value: '仁怀高速服务区',   children: [
                    {value: '生产线1', children: [
                        {value: '1楼楼梯口', id: 1, place: '1', url: 'rtsp://admin:12345@58.42.229.135:33335/Streaming/Channels/102?transportmode-unicast'},
                        {value: '2楼楼梯口', id: 2, place: '2', url: 'rtsp://admin:12345@58.42.229.135:33335/Streaming/Channels/102?transportmode-unicast'},
                        {value: '3楼楼梯口', id: 3, place: '3', url: 'rtsp://admin:12345@58.42.229.135:33335/Streaming/Channels/102?transportmode-unicast'},
                        {value: '4楼楼梯口', id: 4, place: '4', url: 'rtsp://admin:12345@58.42.229.135:33335/Streaming/Channels/102?transportmode-unicast'}
                      ]},
                    {value: '生产线2', children: [
                        {value: '1楼楼梯口', id: 1, place: '1', url: 'rtsp://admin:12345@58.42.229.135:33335/Streaming/Channels/102?transportmode-unicast'},
                        {value: '2楼楼梯口', id: 2, place: '2', url: 'rtsp://admin:12345@58.42.229.135:33335/Streaming/Channels/102?transportmode-unicast'},
                        {value: '3楼楼梯口', id: 3, place: '3', url: 'rtsp://admin:12345@58.42.229.135:33335/Streaming/Channels/102?transportmode-unicast'},
                        {value: '4楼楼梯口', id: 4, place: '4', url: 'rtsp://admin:12345@58.42.229.135:33335/Streaming/Channels/102?transportmode-unicast'}
                      ]},
                    {value: '生产线2', children: [
                        {value: '1楼楼梯口', id: 1, place: '1', url: 'rtsp://admin:12345@58.42.229.135:33335/Streaming/Channels/102?transportmode-unicast'},
                        {value: '2楼楼梯口', id: 2, place: '2', url: 'rtsp://admin:12345@58.42.229.135:33335/Streaming/Channels/102?transportmode-unicast'},
                        {value: '3楼楼梯口', id: 3, place: '3', url: 'rtsp://admin:12345@58.42.229.135:33335/Streaming/Channels/102?transportmode-unicast'},
                        {value: '4楼楼梯口', id: 4, place: '4', url: 'rtsp://admin:12345@58.42.229.135:33335/Streaming/Channels/102?transportmode-unicast'}
                      ]}
                  ] },
              ]
            },
            {
              value: '贵阳市',
              settings: {
                static: true,
              },
              children: [
                { value: '三桥高速服务区',   children: [
                    {value: '高速上行', children: [
                        {value: '1楼楼梯口', id: 1, place: '1', url: 'rtsp://admin:12345@58.42.229.135:33335/Streaming/Channels/102?transportmode-unicast'},
                        {value: '2楼楼梯口', id: 2, place: '2', url: 'rtsp://admin:12345@58.42.229.135:33335/Streaming/Channels/102?transportmode-unicast'},
                        {value: '3楼楼梯口', id: 3, place: '3', url: 'rtsp://admin:12345@58.42.229.135:33335/Streaming/Channels/102?transportmode-unicast'},
                        {value: '4楼楼梯口', id: 4, place: '4', url: 'rtsp://admin:12345@58.42.229.135:33335/Streaming/Channels/102?transportmode-unicast'}
                      ]},
                    {value: '高速下行', children: [
                        {value: '1楼楼梯口', id: 1, place: '1', url: 'rtsp://admin:12345@58.42.229.135:33335/Streaming/Channels/102?transportmode-unicast'},
                        {value: '2楼楼梯口', id: 2, place: '2', url: 'rtsp://admin:12345@58.42.229.135:33335/Streaming/Channels/102?transportmode-unicast'},
                        {value: '3楼楼梯口', id: 3, place: '3', url: 'rtsp://admin:12345@58.42.229.135:33335/Streaming/Channels/102?transportmode-unicast'},
                        {value: '4楼楼梯口', id: 4, place: '4', url: 'rtsp://admin:12345@58.42.229.135:33335/Streaming/Channels/102?transportmode-unicast'}
                      ]},
                  ] },
                { value: '龙洞堡高速服务区',   children: [
                    {value: '高速上行', children: [
                        {value: '1楼楼梯口', id: 1, place: '1', url: 'rtsp://admin:12345@58.42.229.135:33335/Streaming/Channels/102?transportmode-unicast'},
                        {value: '2楼楼梯口', id: 2, place: '2', url: 'rtsp://admin:12345@58.42.229.135:33335/Streaming/Channels/102?transportmode-unicast'},
                        {value: '3楼楼梯口', id: 3, place: '3', url: 'rtsp://admin:12345@58.42.229.135:33335/Streaming/Channels/102?transportmode-unicast'},
                        {value: '4楼楼梯口', id: 4, place: '4', url: 'rtsp://admin:12345@58.42.229.135:33335/Streaming/Channels/102?transportmode-unicast'}
                      ]},
                    {value: '高速下行', children: [
                        {value: '1楼楼梯口', id: 1, place: '1', url: 'rtsp://admin:12345@58.42.229.135:33335/Streaming/Channels/102?transportmode-unicast'},
                        {value: '2楼楼梯口', id: 2, place: '2', url: 'rtsp://admin:12345@58.42.229.135:33335/Streaming/Channels/102?transportmode-unicast'},
                        {value: '3楼楼梯口', id: 3, place: '3', url: 'rtsp://admin:12345@58.42.229.135:33335/Streaming/Channels/102?transportmode-unicast'},
                        {value: '4楼楼梯口', id: 4, place: '4', url: 'rtsp://admin:12345@58.42.229.135:33335/Streaming/Channels/102?transportmode-unicast'}
                      ]}
                  ] },
              ]
            }
          ]
        },
        {
          value: '四号监视窗',
          children: [
            {
              value: '遵义市',
              children: [
                { value: '乌江高速服务区',   children: [
                    {value: '高速上行', children: [
                        {value: '1楼楼梯口', id: 1, place: '1', url: 'rtsp://admin:12345@58.42.229.135:33335/Streaming/Channels/102?transportmode-unicast'},
                        {value: '转弯楼道', id: 2, place: '2', url: 'rtsp://admin:12345a@222.85.147.216:554/Streaming/Channels/102?transportmode-unicast'},
                        {value: '厕所旁边', id: 3, place: '3', url: 'rtsp://admin:12345a@222.85.147.216:554/Streaming/Channels/202?transportmode-unicast'},
                        {value: '马路口', id: 4, place: '4', url: 'rtsp://admin:12345a@222.85.147.216:554/Streaming/Channels/302?transportmode-unicast'}
                      ]},
                    {value: '高速下行', children: [
                        {value: '二楼餐厅', id: 1, place: '1', url: 'rtsp://admin:12345a@222.85.147.216:554/Streaming/Channels/102?transportmode-unicast'},
                        {value: '办公室', id: 2, place: '2', url: 'rtsp://admin:12345@58.42.229.135:33335/Streaming/Channels/102?transportmode-unicast'},
                        {value: '3楼楼梯口', id: 3, place: '3', url: 'rtsp://admin:12345@58.42.229.135:33335/Streaming/Channels/102?transportmode-unicast'},
                        {value: '4楼楼梯口', id: 4, place: '4', url: 'rtsp://admin:12345@58.42.229.135:33335/Streaming/Channels/102?transportmode-unicast'}
                      ]},
                  ] },
                { value: '仁怀高速服务区',   children: [
                    {value: '生产线1', children: [
                        {value: '1楼楼梯口', id: 1, place: '1', url: 'rtsp://admin:12345@58.42.229.135:33335/Streaming/Channels/102?transportmode-unicast'},
                        {value: '2楼楼梯口', id: 2, place: '2', url: 'rtsp://admin:12345@58.42.229.135:33335/Streaming/Channels/102?transportmode-unicast'},
                        {value: '3楼楼梯口', id: 3, place: '3', url: 'rtsp://admin:12345@58.42.229.135:33335/Streaming/Channels/102?transportmode-unicast'},
                        {value: '4楼楼梯口', id: 4, place: '4', url: 'rtsp://admin:12345@58.42.229.135:33335/Streaming/Channels/102?transportmode-unicast'}
                      ]},
                    {value: '生产线2', children: [
                        {value: '1楼楼梯口', id: 1, place: '1', url: 'rtsp://admin:12345@58.42.229.135:33335/Streaming/Channels/102?transportmode-unicast'},
                        {value: '2楼楼梯口', id: 2, place: '2', url: 'rtsp://admin:12345@58.42.229.135:33335/Streaming/Channels/102?transportmode-unicast'},
                        {value: '3楼楼梯口', id: 3, place: '3', url: 'rtsp://admin:12345@58.42.229.135:33335/Streaming/Channels/102?transportmode-unicast'},
                        {value: '4楼楼梯口', id: 4, place: '4', url: 'rtsp://admin:12345@58.42.229.135:33335/Streaming/Channels/102?transportmode-unicast'}
                      ]},
                    {value: '生产线2', children: [
                        {value: '1楼楼梯口', id: 1, place: '1', url: 'rtsp://admin:12345@58.42.229.135:33335/Streaming/Channels/102?transportmode-unicast'},
                        {value: '2楼楼梯口', id: 2, place: '2', url: 'rtsp://admin:12345@58.42.229.135:33335/Streaming/Channels/102?transportmode-unicast'},
                        {value: '3楼楼梯口', id: 3, place: '3', url: 'rtsp://admin:12345@58.42.229.135:33335/Streaming/Channels/102?transportmode-unicast'},
                        {value: '4楼楼梯口', id: 4, place: '4', url: 'rtsp://admin:12345@58.42.229.135:33335/Streaming/Channels/102?transportmode-unicast'}
                      ]}
                  ] },
              ]
            },
            {
              value: '贵阳市',
              settings: {
                static: true,
              },
              children: [
                { value: '三桥高速服务区',   children: [
                    {value: '高速上行', children: [
                        {value: '1楼楼梯口', id: 1, place: '1', url: 'rtsp://admin:12345@58.42.229.135:33335/Streaming/Channels/102?transportmode-unicast'},
                        {value: '2楼楼梯口', id: 2, place: '2', url: 'rtsp://admin:12345@58.42.229.135:33335/Streaming/Channels/102?transportmode-unicast'},
                        {value: '3楼楼梯口', id: 3, place: '3', url: 'rtsp://admin:12345@58.42.229.135:33335/Streaming/Channels/102?transportmode-unicast'},
                        {value: '4楼楼梯口', id: 4, place: '4', url: 'rtsp://admin:12345@58.42.229.135:33335/Streaming/Channels/102?transportmode-unicast'}
                      ]},
                    {value: '高速下行', children: [
                        {value: '1楼楼梯口', id: 1, place: '1', url: 'rtsp://admin:12345@58.42.229.135:33335/Streaming/Channels/102?transportmode-unicast'},
                        {value: '2楼楼梯口', id: 2, place: '2', url: 'rtsp://admin:12345@58.42.229.135:33335/Streaming/Channels/102?transportmode-unicast'},
                        {value: '3楼楼梯口', id: 3, place: '3', url: 'rtsp://admin:12345@58.42.229.135:33335/Streaming/Channels/102?transportmode-unicast'},
                        {value: '4楼楼梯口', id: 4, place: '4', url: 'rtsp://admin:12345@58.42.229.135:33335/Streaming/Channels/102?transportmode-unicast'}
                      ]},
                  ] },
                { value: '龙洞堡高速服务区',   children: [
                    {value: '高速上行', children: [
                        {value: '1楼楼梯口', id: 1, place: '1', url: 'rtsp://admin:12345@58.42.229.135:33335/Streaming/Channels/102?transportmode-unicast'},
                        {value: '2楼楼梯口', id: 2, place: '2', url: 'rtsp://admin:12345@58.42.229.135:33335/Streaming/Channels/102?transportmode-unicast'},
                        {value: '3楼楼梯口', id: 3, place: '3', url: 'rtsp://admin:12345@58.42.229.135:33335/Streaming/Channels/102?transportmode-unicast'},
                        {value: '4楼楼梯口', id: 4, place: '4', url: 'rtsp://admin:12345@58.42.229.135:33335/Streaming/Channels/102?transportmode-unicast'}
                      ]},
                    {value: '高速下行', children: [
                        {value: '1楼楼梯口', id: 1, place: '1', url: 'rtsp://admin:12345@58.42.229.135:33335/Streaming/Channels/102?transportmode-unicast'},
                        {value: '2楼楼梯口', id: 2, place: '2', url: 'rtsp://admin:12345@58.42.229.135:33335/Streaming/Channels/102?transportmode-unicast'},
                        {value: '3楼楼梯口', id: 3, place: '3', url: 'rtsp://admin:12345@58.42.229.135:33335/Streaming/Channels/102?transportmode-unicast'},
                        {value: '4楼楼梯口', id: 4, place: '4', url: 'rtsp://admin:12345@58.42.229.135:33335/Streaming/Channels/102?transportmode-unicast'}
                      ]}
                  ] },
              ]
            }
          ]
        }
      ]
    };
    this.tree1 = {
      value: '云南高速服务区监控',
      settings: {
        static: true, // 禁止拖动以及右键删除修改菜单
        isCollapsedOnInit: true, // 设置隐藏与展开
        leftMenu: false, // 左菜单栏
        cssClasses: {
          expanded: 'fa fa-caret-down',
          collapsed: 'fa fa-caret-right',
          leaf: 'fa',
          empty: 'fa fa-caret-right disabled'
        },
        templates: {
          leaf: '<i class="fa fa-file-o"></i>',
          leftMenu: '<i class="fa fa-navicon"></i>'
        },
        menuItems: [
          { action: NodeMenuItemAction.Custom, name: 'Foo', cssClass: 'fa fa-arrow-right' },
          { action: NodeMenuItemAction.Custom, name: 'Bar', cssClass: 'fa fa-arrow-right' },
          { action: NodeMenuItemAction.Custom, name: 'Baz', cssClass: 'fa fa-arrow-right'}
        ]
      },
      children: [
        {
          value: '一号监视窗',
          children: [
            {
              value: '遵义市',
              children: [
                { value: '乌江高速服务区',   children: [
                    {value: '高速上行', children: [
                        {value: '1楼楼梯口', id: 1, place: '1', url: 'rtsp://admin:12345@58.42.229.135:33335/Streaming/Channels/102?transportmode-unicast'},
                        {value: '转弯楼道', id: 2, place: '2', url: 'rtsp://admin:12345a@222.85.147.216:554/Streaming/Channels/102?transportmode-unicast'},
                        {value: '厕所旁边', id: 3, place: '3', url: 'rtsp://admin:12345a@222.85.147.216:554/Streaming/Channels/202?transportmode-unicast'},
                        {value: '马路口', id: 4, place: '4', url: 'rtsp://admin:12345a@222.85.147.216:554/Streaming/Channels/302?transportmode-unicast'}
                      ]},
                    {value: '高速下行', children: [
                        {value: '二楼餐厅', id: 1, place: '1', url: 'rtsp://admin:12345a@222.85.147.216:554/Streaming/Channels/102?transportmode-unicast'},
                        {value: '办公室', id: 2, place: '2', url: 'rtsp://admin:12345@58.42.229.135:33335/Streaming/Channels/102?transportmode-unicast'},
                        {value: '3楼楼梯口', id: 3, place: '3', url: 'rtsp://admin:12345@58.42.229.135:33335/Streaming/Channels/102?transportmode-unicast'},
                        {value: '4楼楼梯口', id: 4, place: '4', url: 'rtsp://admin:12345@58.42.229.135:33335/Streaming/Channels/102?transportmode-unicast'}
                      ]},
                  ] },
                { value: '仁怀高速服务区',   children: [
                    {value: '生产线1', children: [
                        {value: '1楼楼梯口', id: 1, place: '1', url: 'rtsp://admin:12345@58.42.229.135:33335/Streaming/Channels/102?transportmode-unicast'},
                        {value: '2楼楼梯口', id: 2, place: '2', url: 'rtsp://admin:12345@58.42.229.135:33335/Streaming/Channels/102?transportmode-unicast'},
                        {value: '3楼楼梯口', id: 3, place: '3', url: 'rtsp://admin:12345@58.42.229.135:33335/Streaming/Channels/102?transportmode-unicast'},
                        {value: '4楼楼梯口', id: 4, place: '4', url: 'rtsp://admin:12345@58.42.229.135:33335/Streaming/Channels/102?transportmode-unicast'}
                      ]},
                    {value: '生产线2', children: [
                        {value: '1楼楼梯口', id: 1, place: '1', url: 'rtsp://admin:12345@58.42.229.135:33335/Streaming/Channels/102?transportmode-unicast'},
                        {value: '2楼楼梯口', id: 2, place: '2', url: 'rtsp://admin:12345@58.42.229.135:33335/Streaming/Channels/102?transportmode-unicast'},
                        {value: '3楼楼梯口', id: 3, place: '3', url: 'rtsp://admin:12345@58.42.229.135:33335/Streaming/Channels/102?transportmode-unicast'},
                        {value: '4楼楼梯口', id: 4, place: '4', url: 'rtsp://admin:12345@58.42.229.135:33335/Streaming/Channels/102?transportmode-unicast'}
                      ]},
                    {value: '生产线2', children: [
                        {value: '1楼楼梯口', id: 1, place: '1', url: 'rtsp://admin:12345@58.42.229.135:33335/Streaming/Channels/102?transportmode-unicast'},
                        {value: '2楼楼梯口', id: 2, place: '2', url: 'rtsp://admin:12345@58.42.229.135:33335/Streaming/Channels/102?transportmode-unicast'},
                        {value: '3楼楼梯口', id: 3, place: '3', url: 'rtsp://admin:12345@58.42.229.135:33335/Streaming/Channels/102?transportmode-unicast'},
                        {value: '4楼楼梯口', id: 4, place: '4', url: 'rtsp://admin:12345@58.42.229.135:33335/Streaming/Channels/102?transportmode-unicast'}
                      ]}
                  ] },
              ]
            },
            {
              value: '贵阳市',
              settings: {
                static: true,
              },
              children: [
                { value: '三桥高速服务区',   children: [
                    {value: '高速上行', children: [
                        {value: '1楼楼梯口', id: 1, place: '1', url: 'rtsp://admin:12345@58.42.229.135:33335/Streaming/Channels/102?transportmode-unicast'},
                        {value: '2楼楼梯口', id: 2, place: '2', url: 'rtsp://admin:12345@58.42.229.135:33335/Streaming/Channels/102?transportmode-unicast'},
                        {value: '3楼楼梯口', id: 3, place: '3', url: 'rtsp://admin:12345@58.42.229.135:33335/Streaming/Channels/102?transportmode-unicast'},
                        {value: '4楼楼梯口', id: 4, place: '4', url: 'rtsp://admin:12345@58.42.229.135:33335/Streaming/Channels/102?transportmode-unicast'}
                      ]},
                    {value: '高速下行', children: [
                        {value: '1楼楼梯口', id: 1, place: '1', url: 'rtsp://admin:12345@58.42.229.135:33335/Streaming/Channels/102?transportmode-unicast'},
                        {value: '2楼楼梯口', id: 2, place: '2', url: 'rtsp://admin:12345@58.42.229.135:33335/Streaming/Channels/102?transportmode-unicast'},
                        {value: '3楼楼梯口', id: 3, place: '3', url: 'rtsp://admin:12345@58.42.229.135:33335/Streaming/Channels/102?transportmode-unicast'},
                        {value: '4楼楼梯口', id: 4, place: '4', url: 'rtsp://admin:12345@58.42.229.135:33335/Streaming/Channels/102?transportmode-unicast'}
                      ]},
                  ] },
                { value: '龙洞堡高速服务区',   children: [
                    {value: '高速上行', children: [
                        {value: '1楼楼梯口', id: 1, place: '1', url: 'rtsp://admin:12345@58.42.229.135:33335/Streaming/Channels/102?transportmode-unicast'},
                        {value: '2楼楼梯口', id: 2, place: '2', url: 'rtsp://admin:12345@58.42.229.135:33335/Streaming/Channels/102?transportmode-unicast'},
                        {value: '3楼楼梯口', id: 3, place: '3', url: 'rtsp://admin:12345@58.42.229.135:33335/Streaming/Channels/102?transportmode-unicast'},
                        {value: '4楼楼梯口', id: 4, place: '4', url: 'rtsp://admin:12345@58.42.229.135:33335/Streaming/Channels/102?transportmode-unicast'}
                      ]},
                    {value: '高速下行', children: [
                        {value: '1楼楼梯口', id: 1, place: '1', url: 'rtsp://admin:12345@58.42.229.135:33335/Streaming/Channels/102?transportmode-unicast'},
                        {value: '2楼楼梯口', id: 2, place: '2', url: 'rtsp://admin:12345@58.42.229.135:33335/Streaming/Channels/102?transportmode-unicast'},
                        {value: '3楼楼梯口', id: 3, place: '3', url: 'rtsp://admin:12345@58.42.229.135:33335/Streaming/Channels/102?transportmode-unicast'},
                        {value: '4楼楼梯口', id: 4, place: '4', url: 'rtsp://admin:12345@58.42.229.135:33335/Streaming/Channels/102?transportmode-unicast'}
                      ]}
                  ] },
              ]
            }
          ]
        },
        {
          value: '二号监视窗',
          children: [
            {
              value: '遵义市',
              children: [
                { value: '乌江高速服务区',   children: [
                    {value: '高速上行', children: [
                        {value: '1楼楼梯口', id: 1, place: '1', url: 'rtsp://admin:12345@58.42.229.135:33335/Streaming/Channels/102?transportmode-unicast'},
                        {value: '转弯楼道', id: 2, place: '2', url: 'rtsp://admin:12345a@222.85.147.216:554/Streaming/Channels/102?transportmode-unicast'},
                        {value: '厕所旁边', id: 3, place: '3', url: 'rtsp://admin:12345a@222.85.147.216:554/Streaming/Channels/202?transportmode-unicast'},
                        {value: '马路口', id: 4, place: '4', url: 'rtsp://admin:12345a@222.85.147.216:554/Streaming/Channels/302?transportmode-unicast'}
                      ]},
                    {value: '高速下行', children: [
                        {value: '二楼餐厅', id: 1, place: '1', url: 'rtsp://admin:12345a@222.85.147.216:554/Streaming/Channels/102?transportmode-unicast'},
                        {value: '办公室', id: 2, place: '2', url: 'rtsp://admin:12345@58.42.229.135:33335/Streaming/Channels/102?transportmode-unicast'},
                        {value: '3楼楼梯口', id: 3, place: '3', url: 'rtsp://admin:12345@58.42.229.135:33335/Streaming/Channels/102?transportmode-unicast'},
                        {value: '4楼楼梯口', id: 4, place: '4', url: 'rtsp://admin:12345@58.42.229.135:33335/Streaming/Channels/102?transportmode-unicast'}
                      ]},
                  ] },
                { value: '仁怀高速服务区',   children: [
                    {value: '生产线1', children: [
                        {value: '1楼楼梯口', id: 1, place: '1', url: 'rtsp://admin:12345@58.42.229.135:33335/Streaming/Channels/102?transportmode-unicast'},
                        {value: '2楼楼梯口', id: 2, place: '2', url: 'rtsp://admin:12345@58.42.229.135:33335/Streaming/Channels/102?transportmode-unicast'},
                        {value: '3楼楼梯口', id: 3, place: '3', url: 'rtsp://admin:12345@58.42.229.135:33335/Streaming/Channels/102?transportmode-unicast'},
                        {value: '4楼楼梯口', id: 4, place: '4', url: 'rtsp://admin:12345@58.42.229.135:33335/Streaming/Channels/102?transportmode-unicast'}
                      ]},
                    {value: '生产线2', children: [
                        {value: '1楼楼梯口', id: 1, place: '1', url: 'rtsp://admin:12345@58.42.229.135:33335/Streaming/Channels/102?transportmode-unicast'},
                        {value: '2楼楼梯口', id: 2, place: '2', url: 'rtsp://admin:12345@58.42.229.135:33335/Streaming/Channels/102?transportmode-unicast'},
                        {value: '3楼楼梯口', id: 3, place: '3', url: 'rtsp://admin:12345@58.42.229.135:33335/Streaming/Channels/102?transportmode-unicast'},
                        {value: '4楼楼梯口', id: 4, place: '4', url: 'rtsp://admin:12345@58.42.229.135:33335/Streaming/Channels/102?transportmode-unicast'}
                      ]},
                    {value: '生产线2', children: [
                        {value: '1楼楼梯口', id: 1, place: '1', url: 'rtsp://admin:12345@58.42.229.135:33335/Streaming/Channels/102?transportmode-unicast'},
                        {value: '2楼楼梯口', id: 2, place: '2', url: 'rtsp://admin:12345@58.42.229.135:33335/Streaming/Channels/102?transportmode-unicast'},
                        {value: '3楼楼梯口', id: 3, place: '3', url: 'rtsp://admin:12345@58.42.229.135:33335/Streaming/Channels/102?transportmode-unicast'},
                        {value: '4楼楼梯口', id: 4, place: '4', url: 'rtsp://admin:12345@58.42.229.135:33335/Streaming/Channels/102?transportmode-unicast'}
                      ]}
                  ] },
              ]
            },
            {
              value: '贵阳市',
              settings: {
                static: true,
              },
              children: [
                { value: '三桥高速服务区',   children: [
                    {value: '高速上行', children: [
                        {value: '1楼楼梯口', id: 1, place: '1', url: 'rtsp://admin:12345@58.42.229.135:33335/Streaming/Channels/102?transportmode-unicast'},
                        {value: '2楼楼梯口', id: 2, place: '2', url: 'rtsp://admin:12345@58.42.229.135:33335/Streaming/Channels/102?transportmode-unicast'},
                        {value: '3楼楼梯口', id: 3, place: '3', url: 'rtsp://admin:12345@58.42.229.135:33335/Streaming/Channels/102?transportmode-unicast'},
                        {value: '4楼楼梯口', id: 4, place: '4', url: 'rtsp://admin:12345@58.42.229.135:33335/Streaming/Channels/102?transportmode-unicast'}
                      ]},
                    {value: '高速下行', children: [
                        {value: '1楼楼梯口', id: 1, place: '1', url: 'rtsp://admin:12345@58.42.229.135:33335/Streaming/Channels/102?transportmode-unicast'},
                        {value: '2楼楼梯口', id: 2, place: '2', url: 'rtsp://admin:12345@58.42.229.135:33335/Streaming/Channels/102?transportmode-unicast'},
                        {value: '3楼楼梯口', id: 3, place: '3', url: 'rtsp://admin:12345@58.42.229.135:33335/Streaming/Channels/102?transportmode-unicast'},
                        {value: '4楼楼梯口', id: 4, place: '4', url: 'rtsp://admin:12345@58.42.229.135:33335/Streaming/Channels/102?transportmode-unicast'}
                      ]},
                  ] },
                { value: '龙洞堡高速服务区',   children: [
                    {value: '高速上行', children: [
                        {value: '1楼楼梯口', id: 1, place: '1', url: 'rtsp://admin:12345@58.42.229.135:33335/Streaming/Channels/102?transportmode-unicast'},
                        {value: '2楼楼梯口', id: 2, place: '2', url: 'rtsp://admin:12345@58.42.229.135:33335/Streaming/Channels/102?transportmode-unicast'},
                        {value: '3楼楼梯口', id: 3, place: '3', url: 'rtsp://admin:12345@58.42.229.135:33335/Streaming/Channels/102?transportmode-unicast'},
                        {value: '4楼楼梯口', id: 4, place: '4', url: 'rtsp://admin:12345@58.42.229.135:33335/Streaming/Channels/102?transportmode-unicast'}
                      ]},
                    {value: '高速下行', children: [
                        {value: '1楼楼梯口', id: 1, place: '1', url: 'rtsp://admin:12345@58.42.229.135:33335/Streaming/Channels/102?transportmode-unicast'},
                        {value: '2楼楼梯口', id: 2, place: '2', url: 'rtsp://admin:12345@58.42.229.135:33335/Streaming/Channels/102?transportmode-unicast'},
                        {value: '3楼楼梯口', id: 3, place: '3', url: 'rtsp://admin:12345@58.42.229.135:33335/Streaming/Channels/102?transportmode-unicast'},
                        {value: '4楼楼梯口', id: 4, place: '4', url: 'rtsp://admin:12345@58.42.229.135:33335/Streaming/Channels/102?transportmode-unicast'}
                      ]}
                  ] },
              ]
            }
          ]
        },
        {
          value: '三号监视窗',
          children: [
            {
              value: '遵义市',
              children: [
                { value: '乌江高速服务区',   children: [
                    {value: '高速上行', children: [
                        {value: '1楼楼梯口', id: 1, place: '1', url: 'rtsp://admin:12345@58.42.229.135:33335/Streaming/Channels/102?transportmode-unicast'},
                        {value: '转弯楼道', id: 2, place: '2', url: 'rtsp://admin:12345a@222.85.147.216:554/Streaming/Channels/102?transportmode-unicast'},
                        {value: '厕所旁边', id: 3, place: '3', url: 'rtsp://admin:12345a@222.85.147.216:554/Streaming/Channels/202?transportmode-unicast'},
                        {value: '马路口', id: 4, place: '4', url: 'rtsp://admin:12345a@222.85.147.216:554/Streaming/Channels/302?transportmode-unicast'}
                      ]},
                    {value: '高速下行', children: [
                        {value: '二楼餐厅', id: 1, place: '1', url: 'rtsp://admin:12345a@222.85.147.216:554/Streaming/Channels/102?transportmode-unicast'},
                        {value: '办公室', id: 2, place: '2', url: 'rtsp://admin:12345@58.42.229.135:33335/Streaming/Channels/102?transportmode-unicast'},
                        {value: '3楼楼梯口', id: 3, place: '3', url: 'rtsp://admin:12345@58.42.229.135:33335/Streaming/Channels/102?transportmode-unicast'},
                        {value: '4楼楼梯口', id: 4, place: '4', url: 'rtsp://admin:12345@58.42.229.135:33335/Streaming/Channels/102?transportmode-unicast'}
                      ]},
                  ] },
                { value: '仁怀高速服务区',   children: [
                    {value: '生产线1', children: [
                        {value: '1楼楼梯口', id: 1, place: '1', url: 'rtsp://admin:12345@58.42.229.135:33335/Streaming/Channels/102?transportmode-unicast'},
                        {value: '2楼楼梯口', id: 2, place: '2', url: 'rtsp://admin:12345@58.42.229.135:33335/Streaming/Channels/102?transportmode-unicast'},
                        {value: '3楼楼梯口', id: 3, place: '3', url: 'rtsp://admin:12345@58.42.229.135:33335/Streaming/Channels/102?transportmode-unicast'},
                        {value: '4楼楼梯口', id: 4, place: '4', url: 'rtsp://admin:12345@58.42.229.135:33335/Streaming/Channels/102?transportmode-unicast'}
                      ]},
                    {value: '生产线2', children: [
                        {value: '1楼楼梯口', id: 1, place: '1', url: 'rtsp://admin:12345@58.42.229.135:33335/Streaming/Channels/102?transportmode-unicast'},
                        {value: '2楼楼梯口', id: 2, place: '2', url: 'rtsp://admin:12345@58.42.229.135:33335/Streaming/Channels/102?transportmode-unicast'},
                        {value: '3楼楼梯口', id: 3, place: '3', url: 'rtsp://admin:12345@58.42.229.135:33335/Streaming/Channels/102?transportmode-unicast'},
                        {value: '4楼楼梯口', id: 4, place: '4', url: 'rtsp://admin:12345@58.42.229.135:33335/Streaming/Channels/102?transportmode-unicast'}
                      ]},
                    {value: '生产线2', children: [
                        {value: '1楼楼梯口', id: 1, place: '1', url: 'rtsp://admin:12345@58.42.229.135:33335/Streaming/Channels/102?transportmode-unicast'},
                        {value: '2楼楼梯口', id: 2, place: '2', url: 'rtsp://admin:12345@58.42.229.135:33335/Streaming/Channels/102?transportmode-unicast'},
                        {value: '3楼楼梯口', id: 3, place: '3', url: 'rtsp://admin:12345@58.42.229.135:33335/Streaming/Channels/102?transportmode-unicast'},
                        {value: '4楼楼梯口', id: 4, place: '4', url: 'rtsp://admin:12345@58.42.229.135:33335/Streaming/Channels/102?transportmode-unicast'}
                      ]}
                  ] },
              ]
            },
            {
              value: '贵阳市',
              settings: {
                static: true,
              },
              children: [
                { value: '三桥高速服务区',   children: [
                    {value: '高速上行', children: [
                        {value: '1楼楼梯口', id: 1, place: '1', url: 'rtsp://admin:12345@58.42.229.135:33335/Streaming/Channels/102?transportmode-unicast'},
                        {value: '2楼楼梯口', id: 2, place: '2', url: 'rtsp://admin:12345@58.42.229.135:33335/Streaming/Channels/102?transportmode-unicast'},
                        {value: '3楼楼梯口', id: 3, place: '3', url: 'rtsp://admin:12345@58.42.229.135:33335/Streaming/Channels/102?transportmode-unicast'},
                        {value: '4楼楼梯口', id: 4, place: '4', url: 'rtsp://admin:12345@58.42.229.135:33335/Streaming/Channels/102?transportmode-unicast'}
                      ]},
                    {value: '高速下行', children: [
                        {value: '1楼楼梯口', id: 1, place: '1', url: 'rtsp://admin:12345@58.42.229.135:33335/Streaming/Channels/102?transportmode-unicast'},
                        {value: '2楼楼梯口', id: 2, place: '2', url: 'rtsp://admin:12345@58.42.229.135:33335/Streaming/Channels/102?transportmode-unicast'},
                        {value: '3楼楼梯口', id: 3, place: '3', url: 'rtsp://admin:12345@58.42.229.135:33335/Streaming/Channels/102?transportmode-unicast'},
                        {value: '4楼楼梯口', id: 4, place: '4', url: 'rtsp://admin:12345@58.42.229.135:33335/Streaming/Channels/102?transportmode-unicast'}
                      ]},
                  ] },
                { value: '龙洞堡高速服务区',   children: [
                    {value: '高速上行', children: [
                        {value: '1楼楼梯口', id: 1, place: '1', url: 'rtsp://admin:12345@58.42.229.135:33335/Streaming/Channels/102?transportmode-unicast'},
                        {value: '2楼楼梯口', id: 2, place: '2', url: 'rtsp://admin:12345@58.42.229.135:33335/Streaming/Channels/102?transportmode-unicast'},
                        {value: '3楼楼梯口', id: 3, place: '3', url: 'rtsp://admin:12345@58.42.229.135:33335/Streaming/Channels/102?transportmode-unicast'},
                        {value: '4楼楼梯口', id: 4, place: '4', url: 'rtsp://admin:12345@58.42.229.135:33335/Streaming/Channels/102?transportmode-unicast'}
                      ]},
                    {value: '高速下行', children: [
                        {value: '1楼楼梯口', id: 1, place: '1', url: 'rtsp://admin:12345@58.42.229.135:33335/Streaming/Channels/102?transportmode-unicast'},
                        {value: '2楼楼梯口', id: 2, place: '2', url: 'rtsp://admin:12345@58.42.229.135:33335/Streaming/Channels/102?transportmode-unicast'},
                        {value: '3楼楼梯口', id: 3, place: '3', url: 'rtsp://admin:12345@58.42.229.135:33335/Streaming/Channels/102?transportmode-unicast'},
                        {value: '4楼楼梯口', id: 4, place: '4', url: 'rtsp://admin:12345@58.42.229.135:33335/Streaming/Channels/102?transportmode-unicast'}
                      ]}
                  ] },
              ]
            }
          ]
        },
        {
          value: '四号监视窗',
          children: [
            {
              value: '遵义市',
              children: [
                { value: '乌江高速服务区',   children: [
                    {value: '高速上行', children: [
                        {value: '1楼楼梯口', id: 1, place: '1', url: 'rtsp://admin:12345@58.42.229.135:33335/Streaming/Channels/102?transportmode-unicast'},
                        {value: '转弯楼道', id: 2, place: '2', url: 'rtsp://admin:12345a@222.85.147.216:554/Streaming/Channels/102?transportmode-unicast'},
                        {value: '厕所旁边', id: 3, place: '3', url: 'rtsp://admin:12345a@222.85.147.216:554/Streaming/Channels/202?transportmode-unicast'},
                        {value: '马路口', id: 4, place: '4', url: 'rtsp://admin:12345a@222.85.147.216:554/Streaming/Channels/302?transportmode-unicast'}
                      ]},
                    {value: '高速下行', children: [
                        {value: '二楼餐厅', id: 1, place: '1', url: 'rtsp://admin:12345a@222.85.147.216:554/Streaming/Channels/102?transportmode-unicast'},
                        {value: '办公室', id: 2, place: '2', url: 'rtsp://admin:12345@58.42.229.135:33335/Streaming/Channels/102?transportmode-unicast'},
                        {value: '3楼楼梯口', id: 3, place: '3', url: 'rtsp://admin:12345@58.42.229.135:33335/Streaming/Channels/102?transportmode-unicast'},
                        {value: '4楼楼梯口', id: 4, place: '4', url: 'rtsp://admin:12345@58.42.229.135:33335/Streaming/Channels/102?transportmode-unicast'}
                      ]},
                  ] },
                { value: '仁怀高速服务区',   children: [
                    {value: '生产线1', children: [
                        {value: '1楼楼梯口', id: 1, place: '1', url: 'rtsp://admin:12345@58.42.229.135:33335/Streaming/Channels/102?transportmode-unicast'},
                        {value: '2楼楼梯口', id: 2, place: '2', url: 'rtsp://admin:12345@58.42.229.135:33335/Streaming/Channels/102?transportmode-unicast'},
                        {value: '3楼楼梯口', id: 3, place: '3', url: 'rtsp://admin:12345@58.42.229.135:33335/Streaming/Channels/102?transportmode-unicast'},
                        {value: '4楼楼梯口', id: 4, place: '4', url: 'rtsp://admin:12345@58.42.229.135:33335/Streaming/Channels/102?transportmode-unicast'}
                      ]},
                    {value: '生产线2', children: [
                        {value: '1楼楼梯口', id: 1, place: '1', url: 'rtsp://admin:12345@58.42.229.135:33335/Streaming/Channels/102?transportmode-unicast'},
                        {value: '2楼楼梯口', id: 2, place: '2', url: 'rtsp://admin:12345@58.42.229.135:33335/Streaming/Channels/102?transportmode-unicast'},
                        {value: '3楼楼梯口', id: 3, place: '3', url: 'rtsp://admin:12345@58.42.229.135:33335/Streaming/Channels/102?transportmode-unicast'},
                        {value: '4楼楼梯口', id: 4, place: '4', url: 'rtsp://admin:12345@58.42.229.135:33335/Streaming/Channels/102?transportmode-unicast'}
                      ]},
                    {value: '生产线2', children: [
                        {value: '1楼楼梯口', id: 1, place: '1', url: 'rtsp://admin:12345@58.42.229.135:33335/Streaming/Channels/102?transportmode-unicast'},
                        {value: '2楼楼梯口', id: 2, place: '2', url: 'rtsp://admin:12345@58.42.229.135:33335/Streaming/Channels/102?transportmode-unicast'},
                        {value: '3楼楼梯口', id: 3, place: '3', url: 'rtsp://admin:12345@58.42.229.135:33335/Streaming/Channels/102?transportmode-unicast'},
                        {value: '4楼楼梯口', id: 4, place: '4', url: 'rtsp://admin:12345@58.42.229.135:33335/Streaming/Channels/102?transportmode-unicast'}
                      ]}
                  ] },
              ]
            },
            {
              value: '贵阳市',
              settings: {
                static: true,
              },
              children: [
                { value: '三桥高速服务区',   children: [
                    {value: '高速上行', children: [
                        {value: '1楼楼梯口', id: 1, place: '1', url: 'rtsp://admin:12345@58.42.229.135:33335/Streaming/Channels/102?transportmode-unicast'},
                        {value: '2楼楼梯口', id: 2, place: '2', url: 'rtsp://admin:12345@58.42.229.135:33335/Streaming/Channels/102?transportmode-unicast'},
                        {value: '3楼楼梯口', id: 3, place: '3', url: 'rtsp://admin:12345@58.42.229.135:33335/Streaming/Channels/102?transportmode-unicast'},
                        {value: '4楼楼梯口', id: 4, place: '4', url: 'rtsp://admin:12345@58.42.229.135:33335/Streaming/Channels/102?transportmode-unicast'}
                      ]},
                    {value: '高速下行', children: [
                        {value: '1楼楼梯口', id: 1, place: '1', url: 'rtsp://admin:12345@58.42.229.135:33335/Streaming/Channels/102?transportmode-unicast'},
                        {value: '2楼楼梯口', id: 2, place: '2', url: 'rtsp://admin:12345@58.42.229.135:33335/Streaming/Channels/102?transportmode-unicast'},
                        {value: '3楼楼梯口', id: 3, place: '3', url: 'rtsp://admin:12345@58.42.229.135:33335/Streaming/Channels/102?transportmode-unicast'},
                        {value: '4楼楼梯口', id: 4, place: '4', url: 'rtsp://admin:12345@58.42.229.135:33335/Streaming/Channels/102?transportmode-unicast'}
                      ]},
                  ] },
                { value: '龙洞堡高速服务区',   children: [
                    {value: '高速上行', children: [
                        {value: '1楼楼梯口', id: 1, place: '1', url: 'rtsp://admin:12345@58.42.229.135:33335/Streaming/Channels/102?transportmode-unicast'},
                        {value: '2楼楼梯口', id: 2, place: '2', url: 'rtsp://admin:12345@58.42.229.135:33335/Streaming/Channels/102?transportmode-unicast'},
                        {value: '3楼楼梯口', id: 3, place: '3', url: 'rtsp://admin:12345@58.42.229.135:33335/Streaming/Channels/102?transportmode-unicast'},
                        {value: '4楼楼梯口', id: 4, place: '4', url: 'rtsp://admin:12345@58.42.229.135:33335/Streaming/Channels/102?transportmode-unicast'}
                      ]},
                    {value: '高速下行', children: [
                        {value: '1楼楼梯口', id: 1, place: '1', url: 'rtsp://admin:12345@58.42.229.135:33335/Streaming/Channels/102?transportmode-unicast'},
                        {value: '2楼楼梯口', id: 2, place: '2', url: 'rtsp://admin:12345@58.42.229.135:33335/Streaming/Channels/102?transportmode-unicast'},
                        {value: '3楼楼梯口', id: 3, place: '3', url: 'rtsp://admin:12345@58.42.229.135:33335/Streaming/Channels/102?transportmode-unicast'},
                        {value: '4楼楼梯口', id: 4, place: '4', url: 'rtsp://admin:12345@58.42.229.135:33335/Streaming/Channels/102?transportmode-unicast'}
                      ]}
                  ] },
              ]
            }
          ]
        }
      ]
    };
  }
  public logEvent(e: NodeEvent): void {
    let videOPlace = e.node.node.place;
    if (videOPlace === '1') {
      this.videoLocation1 = e.node.node.value;
      this.videoUrl1 = e.node.node.url;
      document.querySelector('#window1').innerHTML = this.addHtmlVideo1(e.node.node.url);
    } else if (videOPlace === '2') {
      this.videoLocation2 = e.node.node.value;
      document.querySelector('#window2').innerHTML = this.addHtmlVideo1(e.node.node.url);
      this.videoUrl2 = e.node.node.url;
    }  else if (videOPlace === '3') {
      this.videoLocation3 = e.node.node.value;
      this.videoUrl3 = e.node.node.url;
      document.querySelector('#window3').innerHTML = this.addHtmlVideo1(e.node.node.url);
    } else if (videOPlace === '4')  {
      this.videoLocation4 = e.node.node.value;
      this.videoUrl4 = e.node.node.url;
      document.querySelector('#window4').innerHTML = this.addHtmlVideo1(e.node.node.url);
    }
  }
  public addHtmlVideo1(url: string): string {
    let html = `<object type='application/x-vlc-plugin' id='' width="100%" height="100%" events='True'
                pluginspage="http://www.videolan.org"
                codebase="http://downloads.videolan.org/pub/videolan/vlc-webplugins/2.0.6/npapi-vlc-2.0.6.tar.xz">
                <param name='mrl' value='${url}' />
                <param name='volume' value='50' />
                <param name='autoplay' value='true' />
                <param name='loop' value='false' />
                <param value="transparent" name="wmode">
                <embed id='vlc1' wmode="transparent" type="application/x-vlc-plugin" width="100%" height="100%"
                       pluginspage="http://www.videolan.org" allownetworking="internal" allowscriptaccess="always" quality="high"
                       src="${url}">
            </object>
`;
    return html;
  }
  public getUploadDate() {
    this.videoWindowService.getAreaList().subscribe(
      (value) => {
        console.log(value);
      }
    );
  }
}
export class VideoChildrenList {
  constructor (
    public id: string,
    public name: string,
    public place: string,
    public url: string
  ) {}
}
