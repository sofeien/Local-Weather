var weatherInfo = {
    "resultcode": "200",
    "reason": "successed!",
    "result": {
        "sk": {
            "temp": "13",
            "wind_direction": "北风",
            "wind_strength": "2级",
            "humidity": "65%",
            "time": "19:02"
        },
        "today": {
            "temperature": "8℃~15℃",
            "weather": "多云转阴",
            "weather_id": {
                "fa": "01",
                "fb": "02"
            },
            "wind": "微风",
            "week": "星期六",
            "city": "武汉",
            "date_y": "2017年01月28日",
            "dressing_index": "较冷",
            "dressing_advice": "建议着厚外套加毛衣等服装。年老体弱者宜着大衣、呢外套加羊毛衫。",
            "uv_index": "最弱",
            "comfort_index": "",
            "wash_index": "较适宜",
            "travel_index": "较不宜",
            "exercise_index": "较不宜",
            "drying_index": ""
        },
        "future": {
            "day_20170128": {
                "temperature": "8℃~15℃",
                "weather": "多云转阴",
                "weather_id": {
                    "fa": "01",
                    "fb": "02"
                },
                "wind": "微风",
                "week": "星期六",
                "date": "20170128"
            },
            "day_20170129": {
                "temperature": "0℃~7℃",
                "weather": "小雨转多云",
                "weather_id": {
                    "fa": "07",
                    "fb": "01"
                },
                "wind": "3-4 级",
                "week": "星期日",
                "date": "20170129"
            },
            "day_20170130": {
                "temperature": "1℃~7℃",
                "weather": "多云",
                "weather_id": {
                    "fa": "01",
                    "fb": "01"
                },
                "wind": "微风",
                "week": "星期一",
                "date": "20170130"
            },
            "day_20170131": {
                "temperature": "2℃~5℃",
                "weather": "小雨",
                "weather_id": {
                    "fa": "07",
                    "fb": "07"
                },
                "wind": "微风",
                "week": "星期二",
                "date": "20170131"
            },
            "day_20170201": {
                "temperature": "2℃~6℃",
                "weather": "小雨",
                "weather_id": {
                    "fa": "07",
                    "fb": "07"
                },
                "wind": "微风",
                "week": "星期三",
                "date": "20170201"
            },
            "day_20170202": {
                "temperature": "0℃~7℃",
                "weather": "小雨转多云",
                "weather_id": {
                    "fa": "07",
                    "fb": "01"
                },
                "wind": "3-4 级",
                "week": "星期四",
                "date": "20170202"
            },
            "day_20170203": {
                "temperature": "1℃~7℃",
                "weather": "多云",
                "weather_id": {
                    "fa": "01",
                    "fb": "01"
                },
                "wind": "微风",
                "week": "星期五",
                "date": "20170203"
            }
        }
    },
    "error_code": 0
};

var getWeather = (function () {
    var city = $('#city'),
        weather = $('#weather'),
        temp = $('#temp'),
        datetime = $('#datetime'),
        weekday = $('#weekday'),
        wind = $('#wind'),
        uv = $('#uv'),
        dress = $('#dress'),
        washchar = $('#washchar'),
        trallvel = $('#trallvel'),
        outside = $('#outside');
    return function (weatherInfo) {
        city.val(weatherInfo.result.today.city);
        weather.html(weatherInfo.result.today.weather);
        temp.text(weatherInfo.result.today.temperature);
        datetime.text(weatherInfo.result.today.date_y);
        weekday.text(weatherInfo.result.today.week);
        wind.text(weatherInfo.result.today.wind);
        uv.text(weatherInfo.result.today.uv_index);
        dress.text(weatherInfo.result.today.dressing_advice);
        washchar.text(weatherInfo.result.today.wash_index);
        trallvel.text(weatherInfo.result.today.travel_index);
        outside.text(weatherInfo.result.today.exercise_index);
    }
})();

var getFuture = function (weatherInfo) {
    var futureObj = weatherInfo.result.future;
    var trs = $('#future tr');
    var index = 1;
    for (var i in futureObj) {
        var current = futureObj[i];
        var tds = $(trs[index]).children();
        $(tds[0]).text(current.date);
        $(tds[1]).text(current.week);
        $(tds[2]).text(current.weather);
        $(tds[3]).text(current.temperature);
        $(tds[4]).text(current.wind);
        index += 1;
    }

    $($('#future tr')[1]).hide();
};



$(function () {
    "use strict";

    var searchWeather = function () {
        var city = $('#city').val();
        if (city) {
            $.getJSON(
                'http://v.juhe.cn/weather/index?callback=?', {
                    cityname: city,
                    key: '7e3494510fa39eaa33f3a7addbf81155'
                },
                function (response) {
                    $('#log').text(typeof JSON.stringify(response));
                    getWeather(response);
                    getFuture(response);
                }
            );
        } else {
            alert('请输入城市');
        }
    };

    $('#search').click(searchWeather);
});
