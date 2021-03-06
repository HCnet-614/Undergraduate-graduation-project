# 国内新冠疫情数据获取与展示平台

## 实现了国内总体及各省市（地区）的疫情信息可视化，在地图点击省份即可进入地区情况。

### 大屏：

![Image text](https://github.com/HCnet-614/Undergraduate-graduation-project/blob/main/img/README.png)



### 开发环境：

| 开发工具 |   PyCharm, Jupyter  Notebook   |
| -------- | :----------------------------: |
| 编译环境 |            Anaconda            |
| 编程语言 |          Python  3.6           |
| 数据库   |           MySQL 8.0            |
| 开发框架 |             Flask              |
| 前端框架 |       JS, Ajax, Echarts        |
| 部署环境 | 腾讯云服务器 (CentOS 7.6 64位) |

### 数据库设计

​                                                                                         history表

history表存储每日的总数据，主要包括日期、累计确诊、当日新增确诊、剩余疑似、当日新增疑似、累计治愈、当日新增治愈、累计死亡、当日新增死亡，各字段名、字段类型及说明如表所示。

| 字段名      | 字段类型 | 字段信息     | 非Null | PRIMARY KEY |
| :---------- | -------- | ------------ | ------ | ----------- |
| ds          | datetime | 日期         | √      | √           |
| confirm     | int(11)  | 累计确诊     |        |             |
| confirm_add | int(11)  | 当日新增确诊 |        |             |
| suspect     | int(11)  | 剩余疑似     |        |             |
| suspect_add | int(11)  | 当日新增疑似 |        |             |
| heal        | int(11)  | 累计治愈     |        |             |
| heal_add    | int(11)  | 当日新增治愈 |        |             |
| dead        | int(11)  | 累计死亡     |        |             |
| dead_add    | int(11)  | 当日新增死亡 |        |             |

###### 



​                                                                                      details表

 details表存储每日的详细数据，主要包括数据id、数据最后更新日期、省份、城市、累计确诊、新增确诊、累计治愈、累计死亡，各字段名、字段类型及说明见表4.2所示。其中id为每条数据的标识，在id中设置了自增长AUTO_INCREMENT，保证每条数据不会重复存储。

| 字段名      | 字段类型    | 字段信息     | 非Null | PRIMARY  KEY |
| ----------- | ----------- | ------------ | ------ | ------------ |
| id          | int(11)     | 数据标识     | √      | √            |
| update_time | datetime    | 最后更新时间 |        |              |
| province    | varchar(50) | 省份         |        |              |
| city        | varchar(50) | 城市         |        |              |
| confirm     | int(11)     | 累计确诊     |        |              |
| confirm_add | int(11)     | 新增确诊     |        |              |
| heal        | int(11)     | 累计治愈     |        |              |
| dead        | int(11)     | 累计死亡     |        |              |

###### 



### 系统组织架构表

| 文件      | 作用                   |
| --------- | ---------------------- |
| js        | 存放各模块的可视化组件 |
| province  | 存放各省份的地图       |
| templates | 主要页面布局           |
| app.py    | 存放主要的路由转发请求 |
| spider.py | 爬取疫情数据           |
| utils.py  | 大屏中各模块的功能实现 |



### 遗留问题：

由于“疫情热搜”模块使用的数据源自百度，但是百度热搜已经下架了，所以热搜模块的爬虫部分注释了，直接在数据库里写入了固定的热搜词和相关权重。





