
$(function() {//取本地存储，存储上次查询的城市，在每次软件开启的时候自动查询
    if (!localStorage.getItem("city")) {
        localStorage.setItem("city", '嘉兴');
        $('#city').val(localStorage.getItem("city"));
    } else {
        $('#city').val(localStorage.getItem("city"));
    }
    $('#confirm').trigger("click");
});



$(function() {//回车事件设置默认为查询
    document.onkeydown = function(e) {
        var ev = document.all ? window.event: e;
        if (ev.keyCode == 13) {
            $('#confirm').trigger("click");
        }
    }
});

var citylist = $(".citylist li");//城市列表选择功能
citylist.each(function() {
    $(this).click(function() {
        $('#city').val($(this).html());
        //自动查询
        $('#confirm').trigger("click");
    });
});



$("#confirm").on('click', function() {
    //存储查询的城市名
    localStorage.setItem("city", $('#city').val());
    //ajax查询数据
    $.ajax({
        type: "GET",
        url: "https://api.heweather.com/x3/weather",
        data: {
            city: $('#city').val(),
            'key': 'bb3b0349f73b481288ab058cc22d9d3b'
        },
        dataType: "json",
        success: function(data) {
            //var json=null;
            var json = data["HeWeather data service 3.0"][0];
                if (data["HeWeather data service 3.0"][0].status == "ok") {//如果返回状态成功则执行
                    $("#tip").html('');//提示为空


              new Vue({
                    el:'#main',
                    data:{
                        json:json,
                        now:json.basic.update.loc.substring(11, 17)
                    }
                });
                //空气质量查询
               //alert(ve.$data.json.basic.city)

                var x = Math.ceil(json.aqi.city.aqi / 50);
                var api = $('.aqi-qlty');
                switch (x) {
                case 1:
                    //0~50优可正常活动
                    api.css("background-color", "rgb(0,245,61)");
                    break;
                case 2:
                    //51~100良
                    api.css("background-color", "rgb(230,210,0)");
                    break;
                case 3:
                    //101~150轻度污染
                    api.css("background-color", "rgb(255,204,0)");
                    break;
                case 4:
                    //151~200轻度污染
                    api.css("background-color", "rgb(255,204,0)");
                    break;
                case 5:
                    //值大于200表明空气质量差，称之为中度污染
                    api.css("background-color", "rgb(255,0,0)");
                    break;
                case 6:
                    //值大于200表明空气质量差，称之为中度污染
                    api.css("background-color", "rgb(255,0,0)");
                    break;
                case 7:
                    //大于300表明空气质量极差，已严重污染
                    api.css("background-color", "rgb(0,0,0)");
                    break;
                default:
                    api.css("background-color", "rgb(0,245,61)");
                }
                //风力描述，如果是数字则显示“级”，如果是文字则不加
                var value = json.now.wind.sc.replace(/[^0-9]/ig,"");
                if(!!value){
                   $('.now-wind-sc-title').html("级");
                }else{
                    $('.now-wind-sc-title').html("");
                }

                $('#now-cond-code').html(json.now.cond.code);

                var cond = $('.content');
                switch (parseInt(json.now.cond.code)) {
                case 100:
                    //晴
                    cond.css("background-color", "#80D4FF");
                    break;
                case 101:
                    //多云
                    cond.css("background-color", "#33BBFF");
                    break;
                case 102:
                    //少云
                    cond.css("background-color", "#4DC3FF");
                    break;
                case 103:
                    //晴间多云
                    cond.css("background-color", "#E6E6E6");
                    break;
                case 104:
                    //阴
                    cond.css("background-color", "#D6D6D6");
                    break;
                case 300:
                    //阵雨
                    cond.css("background-color", "#C9C9C9");
                    break;
                case 301:
                    //强阵雨
                    cond.css("background-color", "#BDBDBD");
                    break;
                case 302:
                    //雷阵雨
                    cond.css("background-color", "#B0B0B0");
                    break;
                case 303:
                    //强雷阵雨
                    cond.css("background-color", "#A3A3A3");
                    break;
                case 304:
                    //雷阵雨伴有冰雹
                    cond.css("background-color", "#A3A3A3");
                    break;
                case 305:
                    //小雨
                    cond.css("background-color", "#A3A3FF");
                    break;
                case 306:
                    //中雨
                    cond.css("background-color", "#8A8AFF");
                    break;
                case 307:
                    //大雨
                    cond.css("background-color", "#7070FF");
                    break;
                case 308:
                    //极端降雨
                    cond.css("background-color", "#5757FF");
                    break;
                case 309:
                    //毛毛雨/细雨
                    cond.css("background-color", "#3D3DFF");
                    break;
                case 310:
                    //暴雨
                    cond.css("background-color", "#2424FF");
                    break;
                case 311:
                    //大暴雨
                    cond.css("background-color", "#0A0AFF");
                    break;
                case 312:
                    //特大暴雨
                    cond.css("background-color", "#0000D6");
                    break;
                default:
                    cond.css("background-color", "#00CCA3");
                    break;
                }
                //未来7天
                var vm= new Vue({
                    el:'#week',
                    data:{
                        week:json.daily_forecast
                    }
                });


            } else {
                $("#tip").html('城市名称不对');
            }

            //发送请求，读取图片


        }
    });

    $.ajax({
        type: "GET",
        url: "https://api.heweather.com/x3/condition",
        data: {
            search: 'allcond',
            'key': 'bb3b0349f73b481288ab058cc22d9d3b'
        },
        dataType: "json",
        success: function(data) {
            if (data.status = "ok") {
                for (var i = 0; i < data.cond_info.length; i++) {
                    var code = $('#now-cond-code');
                    if (code.html() == data.cond_info[i].code) {
                        $('#now-cond-icon').html("<img src=" + data.cond_info[i].icon + ">");

                        $('#now-cond-code').html('');
                    }
                }
            }
        }
    });

});