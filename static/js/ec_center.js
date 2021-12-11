var ec_center = echarts.init(document.getElementById('c2'), "dark");

var mydata = [{'name': '上海', 'value': 318}, {'name': '云南', 'value': 162}]

var ec_center_option = {
    title: {
        text: '',
        subtext: '',
        x: 'left'
    },
    tooltip: {
        trigger: 'item'
    },
    //左侧小导航图标
    visualMap: {
        show: true,
        x: 'left',
        y: 'bottom',
        textStyle: {
            fontSize: 8,
        },
        splitList: [{ start: 1,end: 9 },
            {start: 10, end: 99 }, 
			{ start: 100, end: 999 },
            {  start: 1000, end: 9999 },
            { start: 10000 }],
        color: ['#8A3310', '#C64918', '#E55B25', '#F2AD92', '#F9DCD1']
    },
    //配置属性
    series: [{
        name: '累计确诊人数',
        type: 'map',
        mapType: 'china',
        roam: false, //拖动和缩放
        itemStyle: {
            normal: {
                borderWidth: .5, //区域边框宽度
                borderColor: '#009fe8', //区域边框颜色
                areaColor: "#ffefd5", //区域颜色
            },
            emphasis: { //鼠标滑过地图高亮的相关设置
                borderWidth: .5,
                borderColor: '#4b0082',
                areaColor: "#fff",
            }
        },
        label: {
            normal: {
                show: true, //省份名称
                fontSize: 8,
            },
            emphasis: {
                show: true,
                fontSize: 8,
            }
        },
        data:[] //mydata //数据
    }]
};
ec_center.setOption(ec_center_option)


//定义全国省份的数组
var cityArr=[
    ['上海', '河北', '山西', '内蒙古', '辽宁', '吉林','黑龙江',  '江苏', '浙江', '安徽', '福建', '江西', '山东','河南', '湖北', '湖南', '广东', '广西', '海南', '四川', '贵州', '云南', '西藏', '陕西', '甘肃', '青海', '宁夏', '新疆', '北京', '天津', '重庆', '香港', '澳门', '台湾'],
    ['shanghai', 'hebei','shanxi','neimenggu','liaoning','jilin','heilongjiang','jiangsu','zhejiang','anhui','fujian','jiangxi','shandong','henan','hubei','hunan','guangdong','guangxi','hainan','sichuan','guizhou','yunnan','xizang','shanxi1','gansu','qinghai','ningxia','xinjiang', 'beijing', 'tianjin', 'chongqing', 'xianggang', 'aomen', 'taiwan']
];

ec_center.on('click', function (param) {
    var cityName = param.name;
    for(var i=0,len=cityArr[0].length;i<len;i++){
        if(cityName==cityArr[0][i]){
            showCity(cityArr[0][i], cityArr[1][i]);
            return;
        }
    }
    ec_center_option.series[0].mapType='china';
    $.ajax({
        url:"/c2",
        success: function(data) {
			ec_center_option.series[0].data=data.data
            ec_center.setOption(ec_center_option)
		},
		error: function(xhr, type, errorThrown) {
		}
    })
});


function showCity(zhName, pyName){
    $.getScript('./static/js/province/'+pyName+'.js', function(){
        ec_center_option.series[0].mapType=zhName;
        // print('js',properties)
        $.ajax({
            url:"/provinces/" + zhName,
            success: function(data) {
                ec_center_option.series[0].data=data.data
                var cityOption = JSON.parse(JSON.stringify(ec_center_option));
                ec_center.setOption(cityOption);
            },
            error: function(xhr, type, errorThrown) {

            }
        })
    });
}