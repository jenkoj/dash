#!/usr/bin/env node

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


const app = express();
//allow cross origin resource sharing
app.use(cors());

app.listen(4000, () => {
    console.log("API Server listening at 4000");
});

//open connections to databases 
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


//test connections
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


//define all APIs 
app.get('/weather',(req,res) =>{
    /*Get current weahter report */
    //select last enrty
    conWeather.query("SELECT * FROM napoved ORDER BY id DESC LIMIT 1", function (err, result) {
        if (err){
            return res.send(err)
        }
        else {
            return res.json({data:result})
        }
    });
});

app.get('/weather/past/week',(req,res)=>{
    /* Get weather report for past 7 days*/

    //define date related constants  
    pastWeek = Date.now()-(1000*60*60*24*7)
    pastWeek = new Date(pastWeek).toISOString();
    now = new Date().toISOString();

    //select data between now and 7 days
    conWeather.query("SELECT * FROM napoved WHERE `time` BETWEEN '"+pastWeek+"' AND '"+now+"'", function (err, result) {
        if (err){
            console.log(err)
        }
        else {

            averaged_query = calculate_average(result);
            res.json({data:[averaged_query]})
           
        }
    });

});

app.get('/power',(req, res) =>{
    /*Get current power related data */

    conPower.query("SELECT * FROM meritve ORDER BY id DESC LIMIT 1", function (err, result) {
        if (err){
            return res.send(err)
        }
        else {
            return res.json({data:result})
        }
    });
});

app.get('/power/daily',(req, res) =>{
    /*Get average power related data for past 24 hours*/

    yesterday = Date.now()-(1000*60*60*24)
    yestedayISO = new Date(yesterday).toISOString();
    nowISO = new Date().toISOString();

    conPower.query("SELECT * FROM meritve WHERE `time` BETWEEN '"+yestedayISO+"' AND '"+nowISO+"'", function (err, result) {
        if (err){
            console.log(err)
        }
        else {

            averaged_query = calculate_average(result);
            res.json({data:[averaged_query]})
            
        }
    });
});

app.get('/energy/today',(req, res) =>{
    /*Get energy usage since start of the day */

    //convert to GMT+1
    let t = new Date();
    t = t.setHours(t.getHours() + 1);
    now = new Date(t).toISOString()
    let startOfDayEpoch = new Date(t).setUTCHours(0,0,0,0)
    startOfDay = new Date(startOfDayEpoch).toISOString()
    
    conPower.query("SELECT `Phase_1_Apparent_Power`,`Phase_2_Apparent_Power`,`Phase_3_Apparent_Power` FROM meritve WHERE `time` BETWEEN '"+startOfDay+"' AND '"+now+"'", function (err, result) {
        if (err){
            console.log(err)
        }
        else {

            let [energy,price,health] = calculateEnergy(result,startOfDayEpoch,t);
            let id = Math.round(Math.random()*10000)
            let calculatedResults = {data:[{id:id, energy:energy, price:price, health:health}]}
            res.send(calculatedResults)

        }
    });
});

app.get('/energy/month/:n',(req, res) =>{
    /*Gets energy usage for n month back */

    //gets date of firs day of n month back 
    let date = new Date();
    let startOfMonth = new Date(date.getFullYear(), date.getMonth()-req.params.n, 0,25).toISOString()
    let startOfMonthEpoch = new Date(startOfMonth).getTime()

    //gets last date
    let untill
    if (req.params.n == 0){
        //utill now
        untill = new Date().toISOString();
    }else{
        //untill n-1 months back
        untill = new Date(date.getFullYear(), date.getMonth()-req.params.n+1, 0,24).toISOString()
    }

    conPower.query("SELECT `Phase_1_Apparent_Power`,`Phase_2_Apparent_Power`,`Phase_3_Apparent_Power` FROM meritve WHERE `time` BETWEEN '"+startOfMonth+"' AND '"+untill+"'", function (err, result) {
        if (err){
            console.log(err)
        }
        else {

            let [energy,price,health] = calculateEnergy(result,startOfMonthEpoch,untill);
            let id = Math.round(Math.random()*10000)
            let calculatedResults = {data:[{id:id, energy:energy, price:(17+price), health:health}]}
            res.send(calculatedResults)
        }
    });
});


app.get('/esp/:ip/state/:key',(req, res) =>{
    /* Get state of device:ip where roling :key has to match the one on server */

    //check keys 
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
    /* Changes state of device :ip where roling :key has to match the one on server */
    
    //check keys 
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
    /*checks if username and password are in database */

    console.log(req.body.username)
    console.log(req.body.password)

    conUsers.query("SELECT * FROM dash WHERE username = ? and password = ? and status = 1",[req.body.username,req.body.password], function (err, result) {
        if (err){
                
                res.send({
                token: err})
        }
        else {  
                //get number of retries from this user 
                conUsers.query("SELECT * FROM `retries` WHERE `username` LIKE ?",[req.body.username],function (err2, result2) {
                    
                    if (err2){
                
                        res.send({
                        token: err})
                    }
                    
                    if ((result.length != 0) && (result2.length < 10)){

                        res.send({token: 'True'});

                    }else{

                        num_retries = 10 - result2.length
                        num_retries = (num_retries < 0) ? 0 : num_retries

                        res.send({token: 'False',retries: num_retries});
                        
                        //insert failed attempt
                        conUsers.query("INSERT INTO retries (username, password) VALUES (?, ?)",[req.body.username,req.body.password], function (err, result){})
                    }

                })
                           
            }
    });
  });

  app.use('/register/', (req, res) => { 
    /*  Post request pust user creditentials into database  */

    console.log("singing up user:")
    console.log(req.body.username)
    console.log(req.body.password)
    console.log(req.body.email)
    console.log(req.body.firstName)
    console.log(req.body.lastName)
    console.log(req.body.age)


    conUsers.query("INSERT INTO `dash` (`Username`, `Password`, `Email`, `First name`, `Last name`, `Age`, `Status`) VALUES  (?,?,?,?,?,?,0)",[req.body.username,req.body.password,req.body.email,req.body.firstName,req.body.lastName,req.body.age], function (err, result) {
        if (err){

                res.send({response:"error"})
        }else{
                res.send({response:"good"})
        }          
    });
});


//def route
app.get('/',(req,res) =>{
    res.send("Hi, this is dash API!<br/>Go to:<br/> /weather for weather report <br/> /power for current power usage <br/> /esp/ip/status for esp swithc status  <br/> /esp/ip/set/state to set esp switch to wanted state (on/off)");
})


function calculate_average(result){

    now = new Date().toISOString();
    avgAll = {}
    //get keys
    labels = result[0]
    for (var label in labels) {
        if (labels.hasOwnProperty(label)) {
            
            //use keys to fetch data
            let count = 0
            let sum = 0
            for(var element of result){
                sum += Math.abs(element[label])
                count +=1
            }
            avg = sum/count
            avg = Math.round(avg*100)/100
            avgAll[label] = avg

            }
        }
    avgAll.time = now
    return avgAll
}

function calculateEnergy(result,start,stop){
    
    energy = {}
    labels = result[0]
    samples = result.length

    for (var label in labels ) {
        
        let sum = 0
    
        for(var element of result){
            sum += (Math.abs(element[label]))/600
        }
        
        sum = Math.round(sum*100)/100
        energy[label] = sum

    }
        
    energySum = 0.001*(energy.Phase_1_Apparent_Power+energy.Phase_2_Apparent_Power+energy.Phase_3_Apparent_Power) //kWh
    energySum = Math.round(energySum*100)/100
    price = 0.11*energySum //eur
    price = Math.round(price*100)/100   
    
    samples_all = 10*((new Date(stop).getTime() - start)/(1000*60))
    health = Math.round(100*samples/samples_all)/100

    energySum = energySum || 0
    price = price || 0

    return [energySum, price, 100*health]
}