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
