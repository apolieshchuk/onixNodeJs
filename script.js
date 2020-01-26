// content div
let content = $(".content");

// const days name
let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

// on form submit
$("form").submit(onSubmit);

function onSubmit(e) {
  e.preventDefault();
  content.empty();

  const APIKEY = "272323d8d4f830607073c42dfce1c5ed";

  // get city name
  let cityName = $("#inputField").val();

  // form request url
  let url = `http://api.openweathermap.org/data/2.5/forecast?q=${cityName}&APPID=${APIKEY}`;

  // do actions with JSON
  $.get(url,function (json) {

    // timestamp
    let listOfWeather = listByDays(json["list"]);

    // create block frame
    for (let i = 0; i < listOfWeather.length; i++) {
      // img-date
      let unix_timestamp = listOfWeather[i]["dt"];
      let date = new Date(unix_timestamp * 1000);
      let day = days[date.getDay()];

      // img-icon
      let icon = listOfWeather[i]["weather"][0]['icon'];
      let iconUrl = "http://openweathermap.org/img/w/" + icon + ".png";
      createWeatherBlock(day, iconUrl);
    }
  }).fail(function () {
    content.append("<div> Sorry but city is incorrect </div>");
  });

}

function listByDays(listOfWeather) {
  let result = [];
  for (let i = 0; i < listOfWeather.length; i += 8) {
    result.push(listOfWeather[i]);
  }
  return result;
}

function createWeatherBlock(day, iconUrl) {
  let wrapper = $("<div class='weather-wrapper'></div>");
  content.append(wrapper);
  wrapper.append("<div class='weather-header'>" + day + "</div>");
  wrapper.append("<div class='weather-footer flex'><div><img id='icon' src='"+ iconUrl + "'></div></div>");
}