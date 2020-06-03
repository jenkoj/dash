//definiram potrebne knjižnice
const express = require("express");
const cors = require("cors");
const mysql = require('mysql');

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
const con = mysql.createConnection({
    host: "localhost",
    user: "secret password",
    password: "secret password",
    database: "vreme"
  });


// uporabim prej definiran objekt con, da se povežem na podatkovno bazo, v primeru errorja ga ujamem in izpišem
con.connect(err =>{
    if(err){
        return err;
    }
});

/*
V spodnjih dveh vrsticah uporabim prej definiran objekt app (serve) da v primeru
get requesta odgovorim z neko vsebino. Tu se spomnimo da server že posluša in čaka na requeste
*/

app.get('/napoved',(req ,res) =>{
    //iz serverja vedno izberem nazadnje vpisan podatek
    con.query("SELECT * FROM napoved ORDER BY id DESC LIMIT 1", function (err, result, fields) {
        if (err){
            return res.send(err)
        }
        else {
            return res.json({podatki:result})
        }
    });
});

app.get('/',(req ,res) =>{
    res.send("to je root pojdi drugam recimo na /napoved");
})

