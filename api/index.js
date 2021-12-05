//definiram potrebne knjižnice
//express je framework ki je zgrajen na http knjižnici
const express = require("express");
const cors = require("cors");
const mysql = require('mysql');
var fs = require('fs');

try {  
    var data = fs.readFileSync('../passwords/mysql.txt', 'utf8');
    dataSplit = data.toString().split("\n");
    username = dataSplit[0].split(":")[1];
    password = dataSplit[1].split(":")[1];    
    
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
    user: username,
    password: password,
    database: "vreme"
  });

  const conPower = mysql.createConnection({
    host: "10.10.40.140",
    user: username,
    password: password,
    database: "poraba"
  });

// uporabim prej definiran objekt con, da se povežem na podatkovno bazo, v primeru errorja ga ujamem in izpišem
// => se imenuje fat arrow in ponenostavi zapis funkcije. enak zapis z navadno funkcijo je function(err){koda}
con.connect(err =>{
    if(err){
        return err;
    }
});

/*
V spodnjih dveh vrsticah uporabim prej definiran objekt app (serve) da v primeru
get requesta odgovorim z neko vsebino. Tu se spomnimo da server že posluša in čaka na requeste
*/

app.get('/napoved',(res) =>{
    //iz serverja vedno izberem nazadnje vpisan podatek
    con.query("SELECT * FROM napoved ORDER BY id DESC LIMIT 1", function (err, result) {
        if (err){
            return res.send(err)
        }
        else {
            return res.json({podatki:result})
        }
    });
});


app.get('/napoved',(res) =>{
    //iz serverja vedno izberem nazadnje vpisan podatek
    con.query("SELECT * FROM napoved ORDER BY id DESC LIMIT 1", function (err, result) {
        if (err){
            return res.send(err)
        }
        else {
            return res.json({podatki:result})
        }
    });
});

app.get('/',(res) =>{
    res.send("to je root pojdi drugam recimo na /napoved");
})

