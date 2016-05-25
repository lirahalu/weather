

$('#confirm').on('click', function () {
   /* $('.form *').html("");*/
    $.ajax({
        type: "GET",
        url: "https://api.heweather.com/x3/weather",
        data: {city: $('#city').val(), 'key': 'bb3b0349f73b481288ab058cc22d9d3b'},
        dataType: "json",
        success: function (data) {
            var json = data["HeWeather data service 3.0"][0];
            if (data["HeWeather data service 3.0"][0].status == "ok") {
                $('#cityname').html(json.basic.city);
                $('#update-loc').html(json.basic.update.loc);
                $('#api').html(json.aqi.city.aqi);
                $('#aqi-pm25').html(json.aqi.city.pm25);
                $('#aqi-pm10').html(json.aqi.city.pm10);
                $('#aqi-so2').html(json.aqi.city.so2);
                $('#aqi-no2').html(json.aqi.city.no2);
                $('#aqi-co').html(json.aqi.city.co);
                $('#aqi-o3').html(json.aqi.city.o3);
                $('#aqi-qlty').html(json.aqi.city.qlty);
                //now
                $('#now-tmp').html(json.now.tmp);
                $('#now-fl').html(json.now.fl);
                $('#now-wind-spd').html(json.now.wind.spd);
                $('#now-wind-sc').html(json.now.wind.sc);
                $('#now-wind-deg').html(json.now.wind.deg);
                $('#now-wind-dir').html(json.now.wind.dir);
                $('#now-cond-code').html(json.now.cond.code);
                $('#now-cond-txt').html(json.now.cond.txt);
                $('#now-pcpn').html(json.now.pcpn);
                $('#now-hum').html(json.now.hum);
                $('#now-pres').html(json.now.pres);
                $('#now-vis').html(json.now.vis);
                //舒适指数
                $('#comf-brf').html(json.suggestion.comf.brf);
                $('#comf-txt').html(json.suggestion.comf.txt);
                $('#drsg-brf').html(json.suggestion.drsg.brf);
                $('#drsg-txt').html(json.suggestion.drsg.txt);
                $('#uv-brf').html(json.suggestion.uv.brf);
                $('#uv-txt').html(json.suggestion.uv.txt);
                $('#cw-brf').html(json.suggestion.cw.brf);
                $('#cw-txt').html(json.suggestion.cw.txt);
                $('#flu-brf').html(json.suggestion.flu.brf);
                $('#flu-txt').html(json.suggestion.flu.txt);
                $('#trav-brf').html(json.suggestion.trav.brf);
                $('#trav-txt').html(json.suggestion.trav.txt);
                $('#sport-brf').html(json.suggestion.sport.brf);
                $('#sport-txt').html(json.suggestion.sport.txt);
                //未来7天
                for (var i = 0; i < json.daily_forecast.length; i++) {
                    var day = json.daily_forecast[i];
                    $('#daily' + (i + 1)).append(
                        "日期：" + day.date +
                        '最高温度' + day.tmp.max + '&#8451;' +
                        '最低温度' + day.tmp.min + '&#8451;' +
                        '风力状况' + day.wind.dir + day.wind.sc +
                        '白天' + day.cond.txt_d +
                        '晚上' + day.cond.txt_n)
                }
            } else {
                alert('城市名称不对')
            }

            $.ajax({
                type: "GET",
                url: "https://api.heweather.com/x3/condition",
                data: {search:'allcond','key':'bb3b0349f73b481288ab058cc22d9d3b'},
                dataType: "json",
                success: function (data) {
                    if(data.status="ok"){
                        for(var i=0;i<data.cond_info.length;i++){
                            if($('#now-cond-code').html()==data.cond_info[i].code){
                                $('#now-cond-icon').html("<img src="+data.cond_info[i].icon+">");

                            }
                        }
                    }
                }
            });


        }
    });


});

