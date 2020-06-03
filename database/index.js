const express = require("express");
const cors = require("cors");
const mysql = require('mysql');

const app = express();
app.use(cors());
app.listen(4000, () => {
    console.log("Vreme Server listening at 4000");

});
const con = mysql.createConnection({
    host: "localhost",
    user: "secret password",
    password: "secret password",
    database: "vreme"
  });


con.connect(err =>{
    if(err){
        return err;
    }
});

app.get('/napoved',(req ,res) =>{
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

