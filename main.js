$(function() {
    $('#city').val("嘉兴");
    $('#confirm').trigger("click");
});

$("#confirm").on('click',
    function() {
        $.ajax({
            type: "GET",
            url: "https://api.heweather.com/x3/weather",
            data: {
                city: $('#city').val(),
                'key': 'bb3b0349f73b481288ab058cc22d9d3b'
            },
            dataType: "json",
            success: function(data) {
                var json = data["HeWeather data service 3.0"][0];
                if (data["HeWeather data service 3.0"][0].status == "ok") {
                    $("#tip").html('');

                    $('#cityname').html(json.basic.city);

                    var now = json.basic.update.loc.substring(11, 17);
                    $('#update-loc').html(now);

                    var api = $('.aqi-qlty');
                    $('#api').html(json.aqi.city.aqi);
                    $('#aqi-qlty').html(json.aqi.city.qlty);
                    var x = Math.ceil(json.aqi.city.aqi / 50);
                    switch (x) {
                        case 1:
                            //0~50优可正常活动
                            api.css("background-color", "rgb(0,245,61)");
                            break;
                        case 2:
                            //51~100良
                            api.css("background-color", "rgb(230,230,0)");
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

                    //now
                    $('#now-tmp').html(json.now.tmp + '&#8451;');
                    $('#now-wind-sc').html(json.now.wind.sc);
                    $('#now-wind-deg').html(json.now.wind.deg);
                    $('#now-wind-dir').html(json.now.wind.dir);
                    $('#now-cond-code').html(json.now.cond.code);

                    var cond = $('.ui-content');
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
                            cond.css("background-color", "#E3E3E3");
                            break;
                        case 300:
                            //阵雨
                            cond.css("background-color", "#D6D6D6");
                            break;
                        case 301:
                            //强阵雨
                            cond.css("background-color", "#C9C9C9");
                            break;
                        case 302:
                            //雷阵雨
                            cond.css("background-color", "#BDBDBD");
                            break;
                        case 303:
                            //强雷阵雨
                            cond.css("background-color", "#B0B0B0");
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
                    $('#now-cond-txt').html(json.now.cond.txt);
                    $('#now-pcpn').html(json.now.pcpn);
                    $('#now-hum').html(json.now.hum);
                    $('#now-pres').html(json.now.pres);
                    $('#now-vis').html(json.now.vis);

                    //未来7天
                    for (var i = 0; i < json.daily_forecast.length; i++) {
                        var day = json.daily_forecast[i];
                        $('#daily' + (i + 1)).find("a").html("");
                        
                        $('#daily' + (i + 1)).find("span").html("");

                        $('#daily' + (i + 1)).find("a").append(day.date);

                        $('#daily' + (i + 1)).find("span").append('<div class="ui-grid-a center">' + '<div class="ui-block-a">' + day.tmp.min + '&#8451;' + '&#8764;' + day.tmp.max + '&#8451;' + '</div>' + '<div class="ui-block-b">' + day.cond.txt_n + '&#160;' + '转' + '&#160;' + day.cond.txt_d + '</div>' + '</div>')
                    }
                } else {
                    $("#tip").html('城市名称不对');
                }

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

            }
        });

    });