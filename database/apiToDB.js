var mysql = require('mysql');
var fs = require('fs');
var unirest = require("unirest");

var req = unirest("GET", "https://community-open-weather-map.p.rapidapi.com/weather");
let rawdata;

function writeToDB() {

    var con = mysql.createConnection({
        host: "10.10.10.111",
        user: "jakob",
        password: "68941",
        database: "vreme"
      });

    let tempInCels = rawdata.main.temp - 273.15;
    tempInCels = Math.round(tempInCels,4) + "°C";

    con.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
        var sql = "INSERT INTO napoved (temp, tlak, vlaznost, oblacnost) VALUES ('"+tempInCels+"','"+rawdata.main.pressure+" hPa"+"','"+rawdata.main.humidity+"%"+"','"+rawdata.clouds.all+"%"+"')";
        con.query(sql, function (err, result,) {
        if (err) throw err;
        console.log("1 record inserted");
        process.exit()
        });
    });
}

req.query( {
	"id": "2172797",
	"units": "%22metric%22",
	"mode": "JSON",
	"q": "Preddvor"
});

req.headers({
	"x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
	"x-rapidapi-key": "secret key"
});

req.end(function (res) {
    if (res.error) throw new Error(res.error);
    rawdata = res.body;
    writeToDB();
});





