// uvozim knjižnice za podatkovno bazo ter api klice
var mysql = require('mysql');
let request = require('request');

let apiKey = '27f14940419fb1c0b5fad02174a97396';
let city = 'Preddvor';
let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`

let rawdata;

//definiram funkcijo ki bo ob klicu zapisala podatke v podatkovno bazo
function writeToDB() {

    //definriam potrebne konstante za povezavo in pisanje v mariadb podatkovno bazo
    var con = mysql.createConnection({
        host: "localhost",
        user: "jakob",
        password: "68941",
        database: "vreme"
      });
    
    //pretvorim podatke iz kelvinov v stopinje celzija
    let tempInCels = rawdata.main.temp - 273.15;
    tempInCels = Math.round(tempInCels,4) + "°C";
    
    // uporaim con objekt za povezavo na bazo in vanjo vpišem 4 podatke
    con.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
        var sql = "INSERT INTO napoved (temp, tlak, vlaznost, oblacnost) VALUES ('"+tempInCels+"','"+rawdata.main.pressure+" hPa"+"','"+rawdata.main.humidity+"%"+"','"+rawdata.clouds.all+"%"+"')";
        
        //pridobim informacijo od serverja (ack) da se je podatke vpisal
        con.query(sql, function (err, result,) {
        if (err) throw err;
        console.log("1 record inserted");
        process.exit()
        });
    });
}

request(url, function (err, response) {
    if(err){
      console.log('error:', error);
    } else {
      rawdata = JSON.parse(response.body)
      writeToDB();
    }
  });