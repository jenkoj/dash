// uvozim knjižnice za podatkovno bazo ter api klice
var mysql = require('mysql');
//unirest je lahkotna knjižnica za HTTP klice
var unirest = require("unirest");

// naredim req objekt kjer bom zahteval infromacije iz url-ja alternativen ukaz unirest.get("url")
var req = unirest("GET", "https://community-open-weather-map.p.rapidapi.com/weather");
let rawdata;

//definiram funkcijo ki bo ob klicu zapisala podatke v podatkovno bazo
function writeToDB() {

    //definriam potrebne konstante za povezavo in pisanje v mariadb podatkovno bazo
    var con = mysql.createConnection({
        host: "localhost",
        user: "/",
        password: "/",
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

// v req objekt dodam parametre ki jih bom poslal API-ju
req.query( {
	"id": "2172797",
	"units": "%22metric%22",
	"mode": "JSON",
	"q": "Preddvor"
});

// dodam moj api ključ (na voljo imam le 100 requestov na dan)
req.headers({
	"x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
	"x-rapidapi-key": "/"
});

//zaključim request in naredim funckijo z parametrom res oz response

req.end(function (res) {
    //handlam error
    if (res.error) throw new Error(res.error);
    //podatke znotraj res objekta zapišem v rawdata spremenjlivko
    rawdata = res.body;
    //kličem funckicjo zgoraj
    writeToDB();
});





