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
    var data = fs.readFileSync('../src/creds/pass.json', 'utf8');
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
    console.log("API Server listening at 4000");
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

const conUsers = mysql.createConnection({
    host: "10.10.40.140",
    user: data.mysql.user,
    password: data.mysql.pass,
    database: "users"
  });

// uporabim prej definiran objekt con, da se povežem na podatkovno bazo, v primeru errorja ga ujamem in izpišem
// => se imenuje fat arrow in ponenostavi zapis funkcije. enak zapis z navadno funkcijo je function(err){koda}
conWeather.connect(err =>{
    if(err){
        return err;
    }
});

conPower.connect(err =>{
    if(err){
        return err;
    }
});

conUsers.connect(err =>{
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

app.get('/weather/digest/weekly',(req,res)=>{

    week = Date.now()-(1000*60*60*24*7)
    weekISO = new Date(yesterday).toISOString();
    nowISO = new Date().toISOString();

    conWeather.query("SELECT * FROM napoved WHERE `time` BETWEEN '"+weekISO+"' AND '"+nowISO+"'", function (err, result) {
        if (err){
            console.log(err)
        }
        else {

            averaged_query = calculate_average(result);
            res.json({data:averaged_query})
           
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

app.get('/power/today',(req, res) =>{
    //iz serverja vedno izberem nazadnje vpisan podatek
    yesterday = Date.now()-(1000*60*60*24)
    yestedayISO = new Date(yesterday).toISOString();
    nowISO = new Date().toISOString();

    conPower.query("SELECT * FROM meritve WHERE `time` BETWEEN '"+yestedayISO+"' AND '"+nowISO+"'", function (err, result) {
        if (err){
            console.log(err)
        }
        else {

            averaged_query = calculate_average(result);
            res.json({data:averaged_query})
            
        }
    });
});

app.get('/energy/today',(req, res) =>{
    //iz serverja vedno izberem nazadnje vpisan podatek
    now = new Date().toISOString();

    let startOfDayEpoch = new Date().setUTCHours(0,0,0,0)
    startOfDay = new Date(startOfDayEpoch).toISOString()

    conPower.query("SELECT `Phase_1_Apparent_Power`,`Phase_2_Apparent_Power`,`Phase_3_Apparent_Power` FROM meritve WHERE `time` BETWEEN '"+startOfDay+"' AND '"+now+"'", function (err, result) {
        if (err){
            console.log(err)
        }
        else {

            let [energy,price,health] = calculateEnergy(result,startOfDayEpoch,now);
            let calculatedResults = {data:{energy:energy, price:price, health:health}}
            console.log(calculatedResults)
            res.send(calculatedResults)

        }
    });
});

app.get('/energy/month/:n',(req, res) =>{
    
    //gets date of firs day of n months back
    let date = new Date();
    let startOfMonth = new Date(date.getFullYear(), date.getMonth()-req.params.n, 0,25).toISOString()
    let startOfMonthEpoch = new Date(startOfMonth).getTime()

    //gets last date
    console.log(req.params.n)
    let untill
    if (req.params.n == 0){
        console.log("here")

        //utill now
        untill = new Date().toISOString();
        console.log(untill)
    }else{
        console.log("here2")

        //untill n-1 months back
        untill = new Date(date.getFullYear(), date.getMonth()-req.params.n+1, 0,24).toISOString()
    }

    conPower.query("SELECT `Phase_1_Apparent_Power`,`Phase_2_Apparent_Power`,`Phase_3_Apparent_Power` FROM meritve WHERE `time` BETWEEN '"+startOfMonth+"' AND '"+untill+"'", function (err, result) {
        if (err){
            console.log(err)
        }
        else {

            let [energy,price,health] = calculateEnergy(result,startOfMonthEpoch,untill);
            let calculatedResults = {data:{energy:energy, price:price, health:health}}
            console.log(calculatedResults)
            res.send(calculatedResults)
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


// for parsing POST request
const bodyParser = require("body-parser");
const { time } = require("console");

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

app.use('/login', (req, res) => { 

    console.log(req.body.username)
    console.log(req.body.password)

    conUsers.query("SELECT * FROM dash WHERE username = ? and password = ?",[req.body.username,req.body.password], function (err, result) {
        if (err){
                
                res.send({
                token: err})
        }
        else {  
                
                conUsers.query("SELECT * FROM `retries` WHERE `username` LIKE ?",[req.body.username],function (err2, result2) {
                    
                    if (err2){
                
                        res.send({
                        token: err})
                    }
                    
                    if ((result.length != 0) && (result2.length < 10)){
                        res.send({
                        token: 'True'
                        
                        });
                    }   else{
                        num_retries = 10 - result2.length
                        num_retries = (num_retries < 0) ? 0 : num_retries

                        res.send({
                        token: 'False',
                        retries: num_retries
                        });
                        
                        conUsers.query("INSERT INTO retries (username, password) VALUES (?, ?)",[req.body.username,req.body.password], function (err, result){})
                    }

                })
                           
            }
    });
  });



//def route
app.get('/',(req,res) =>{
    res.send("Hi, this is dash API!<br/>Go to:<br/> /weather for weather report <br/> /power for current power usage <br/> /esp/ip/status for esp swithc status  <br/> /esp/ip/set/state to set esp switch to wanted state (on/off)");
})


function calculate_average(result){

    nowISO = new Date().toISOString();
    avgAll = {}
    //get keys
    vals = result[0]
    for (var key in vals) {
        if (vals.hasOwnProperty(key)) {
            
            //use keys to fetch data
            let count = 0
            let sum = 0
            for(var element of result){
                sum += Math.abs(element[key])
                count +=1
            }
            avg = sum/count
            avg = Math.round(avg*100)/100
            avgAll[key] = avg

            }
        }
    avgAll.time = nowISO
    return avgAll
}

function calculateEnergy(result,start,stop){
    energy = {}
    vals = result[0]
    samples = result.length
    for (var key in vals) {
        
        let sum = 0
    
        for(var element of result){
            sum += (Math.abs(element[key]))/600
        }
        
        sum = Math.round(sum*100)/100
        energy[key] = sum

    }
        
    energySum = 0.001*(energy.Phase_1_Apparent_Power+energy.Phase_2_Apparent_Power+energy.Phase_3_Apparent_Power) //kWh
    energySum = Math.round(energySum*100)/100
    price = 0.11*energySum //eur
    price = Math.round(price*100)/100   

    samples_all = 10*((new Date(stop).getTime() - start)/(1000*60))
    health = Math.round(100*samples/samples_all)/100

    return [energySum, price, health]
}