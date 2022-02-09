#!/usr/bin/env node

const mysql = require('mysql');
const request = require('request');
var fs = require('fs');

try {  
  var data = fs.readFileSync('../pass/pass.json', 'utf8');
  data = JSON.parse(data)

} catch(e) {
  console.log('Error:', e.stack);
}


const apiKey = data.weather.key;
const city = 'Preddvor';
const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`


//http://api.openweathermap.org/data/2.5/weather?q=Preddvor&appid=27f14940419fb1c0b5fad02174a97396

let rawdata;

/**
 * Define function that will insert weahter data from openweatherAPI to my DB
 */
function writeToDB() {

    let con = mysql.createConnection({
        host: "localhost",
        user: data.mysql.user,
        password: data.mysql.pass,
        database: "vreme"
      });
    
    // convert from kelvin to celsius
    let tempInCels = rawdata.main.temp - 273.15;
    tempInCels = Math.round(tempInCels,4);
    
    // use con object to connect to DB and insert data 
    con.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
        var sql = "INSERT INTO napoved (time, temp, tlak, vlaznost, oblacnost) VALUES (CURRENT_TIMESTAMP,'"+tempInCels+"','"+rawdata.main.pressure+"','"+rawdata.main.humidity+"','"+rawdata.clouds.all+"')";
        
        //wait for ack 
        con.query(sql, function (err) {
        if (err) throw err;
        console.log("1 record inserted");
        process.exit()
        });
    });
}

//make a request to openweatherAPI and call function above to inert it into DB 
request(url, function (err, response) {
    if(err){
      console.log('error:', error);
    } else {
      rawdata = JSON.parse(response.body)
      writeToDB();
    }
  });
