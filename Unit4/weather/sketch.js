// Note - use your own APPID to get this to work!

let weather;
let weatherID = 0; // returned in the JSON weather element
let state = 0;
let r = 0;
let b = 0;
let humidity = 0;
let temperature = 0;
let desc = '' ;
let font;

function setup() {
  createCanvas(400, 400);

  // HERE is the call to get the weather. We build the string first.

  let myCityString =
    "https://api.openweathermap.org/data/2.5/weather?q=Fargo,ND,US&units=imperial&";

  //You can also use "zipcode"
  // substitute zip=61820 for q=Normal,IL,US

  font = loadFont('assets/SourceSansPro-Light.ttf');

 // let myIDString = "appid=xxxxx"; // put your ID instead of xxxxx

  let myIDString = "appid=2ab3fd961cc8c4aacb1786ddb79e8da5" ;

  let myTotalString = myCityString + myIDString;


  loadJSON(myTotalString, gotData); // that gotData function happens when JSON comes back.


}

function gotData(data) {
  weather = data;
  print(weather); // for debugging purposes, print out the JSON data when we get it.
  humidity = weather.main.humidity;
  temperature = weather.main.temp;
  desc = weather.weather[0].description;

}

function draw() {
  switch (state) {

    case 0:
      if (weather) {
        state = 1;
      }
      break;

    case 1:
      background(255);
      fill("black");
      textSize(25);
      textFont(font);
      text("What is the weather in " + weather.name + "?", 20, 20);
      text("humidity is " + humidity, 20, 40);
      text("temperature is " + temperature, 20, 60);
      text(desc, 20, 80);


      //if temp is high, it gets red, if humidity is high, it gets blue.
      fill(r, 0, b);
      ellipse(width/2, height/2, 200, 200)
      r = temperature;
      b = humidity;



      break;
  }
}
