#!/usr/bin/env node

//definiram potrebne knjižnice
//express je framework ki je zgrajen na http knjižnici
const express = require("express");
const cors = require("cors");
const mysql = require('mysql');
var fs = require('fs');
const exec = require("child_process").exec;
const { SIGPWR } = require("constants");

try {  
    var data = fs.readFileSync('../pass/pass.json', 'utf8');
    data = JSON.parse(data)
   
} catch(e) {
    console.log('Error:', e.stack);
}

// definiram app objekt
const app = express();
//cors mi omogoča da API lahko bere vsebino brez težav. CORS - cross origin resource sharing
//brez corsa mi spletna stran vrne error ob branju
app.use(cors());
//nastavim port kjer posušam in začnem poslušati
app.listen(4000, () => {
    console.log("Vreme Server listening at 4000");
});

// naredim con objekt kjer definiram parametre ki so potrebi ni povezovanju na sql server
const conWeather = mysql.createConnection({
    host: "10.10.40.140",
    user: data.mysql.user,
    password: data.mysql.pass,
    database: "vreme"
  });

const conPower = mysql.createConnection({
    host: "10.10.40.140",
    user: data.mysql.user,
    password: data.mysql.pass,
    database: "poraba"
  });

// uporabim prej definiran objekt con, da se povežem na podatkovno bazo, v primeru errorja ga ujamem in izpišem
// => se imenuje fat arrow in ponenostavi zapis funkcije. enak zapis z navadno funkcijo je function(err){koda}
conWeather.connect(err =>{
    if(err){
        return err;
    }
});

/*
V spodnjih dveh vrsticah uporabim prej definiran objekt app (serve) da v primeru
get requesta odgovorim z neko vsebino. Tu se spomnimo da server že posluša in čaka na requeste
*/

app.get('/weather',(req,res) =>{
    //iz serverja vedno izberem nazadnje vpisan podatek
    conWeather.query("SELECT * FROM napoved ORDER BY id DESC LIMIT 1", function (err, result) {
        if (err){
            return res.send(err)
        }
        else {
            return res.json({podatki:result})
        }
    });
});


app.get('/power',(req, res) =>{
    //iz serverja vedno izberem nazadnje vpisan podatek
    conPower.query("SELECT * FROM meritve ORDER BY id DESC LIMIT 1", function (err, result) {
        if (err){
            return res.send(err)
        }
        else {
            return res.json({podatki:result})
        }
    });
});

app.get('/esp/:ip/state/:key',(req, res) =>{

    //rolling api key must match
    if (data.esp.key == req.params.key){

        let switchState;
        ip = req.params.ip

        exec("curl " + ip, (error, stdout, stderr) => {
            try {
            //parse html
            let st = stdout.split('<!--#state-->')[1].split("</h1>")[0];
            if (st == "on") switchState = "true";
            else switchState = "false";
            res.json({state:switchState})

            } catch(typeError){
                switchState = "false";
                console.log("error while getting switch state")
            }
        })  
        
    }
    else{
        res.send("invalid api key")
   }
});

app.get('/esp/:ip/set/:cmd/:key',(req, res) =>{

    //rolling api key must match
    if (data.esp.key == req.params.key){

        let switchState;
        ip = req.params.ip
        cmd = req.params.cmd
        exec("curl " + ip+"/"+cmd, (error, stdout, stderr) => {
            try {
                //parse html
                let st = stdout.split('<p>')[1].split("</p>")[0];
                
                if (cmd == "on") switchState = 1;
                else switchState = 0;
                res.json('{state:'+switchState+'}')

            } catch(typeError){
                switchState = 0;
                console.log("error")
            }
        })  
    }
    else{
        res.send("invalid api key")
    }
});


app.get('/',(req,res) =>{
    res.send("Hi, this is dash API!<br/>Go to:<br/> /weather for weather report <br/> /power for current power usage <br/> /esp/ip/status for esp swithc status  <br/> /esp/ip/set/state to set esp switch to wanted state (on/off)");
})

