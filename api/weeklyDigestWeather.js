const mysql = require('mysql');
var fs = require('fs');

try {  
    var data = fs.readFileSync('../src/creds/pass.json', 'utf8');
    data = JSON.parse(data)
   
} catch(e) {
    console.log('Error:', e.stack);
}

const conPower = mysql.createConnection({
    host: "10.10.40.140",
    user: data.mysql.user,
    password: data.mysql.pass,
    database: "vreme"
  });

conPower.connect(err =>{
    if(err){
        return err;
    }
});

yesterday = Date.now()-(1000*60*60*24)
yestedayISO = new Date(yesterday).toISOString();
nowISO = new Date().toISOString();

conPower.query("SELECT * FROM napoved WHERE `time` BETWEEN '"+yestedayISO+"' AND '"+nowISO+"'", function (err, result) {
    if (err){
        console.log(err)
    }
    else {

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
        console.log(avgAll)
        // sql = "INSERT INTO digest_short (time, Phase_1_voltage_RMS, Phase_2_voltage_RMS, Phase_3_voltage_RMS, Phase_1_current_RMS, Phase_2_current_RMS, Phase_3_current_RMS , N_Line_calc_current_RMS, Phase_1_Active_Power, Phase_2_Active_Power,Phase_3_Active_Power,Phase_1_Apparent_Power,Phase_2_Apparent_Power,Phase_3_Apparent_Power ,Phase_1_frequency  ,Phase_1_PF , Phase_2_PF , Phase_3_PF) VALUES (CURRENT_TIMESTAMP,"+avgAll.Phase_1_voltage_RMS+","+avgAll.Phase_2_voltage_RMS+","+avgAll.Phase_3_voltage_RMS+","+avgAll.Phase_1_current_RMS+","+avgAll.Phase_2_current_RMS+","+avgAll.Phase_3_current_RMS+","+avgAll.N_Line_calc_current_RMS+","+avgAll.Phase_1_Active_Power+","+avgAll.Phase_2_Active_Power+","+avgAll.Phase_3_Active_Power+","+avgAll.Phase_1_Apparent_Power+","+avgAll.Phase_2_Apparent_Power+","+avgAll.Phase_3_Apparent_Power+","+avgAll.Phase_1_frequency+","+avgAll.Phase_1_PF+","+avgAll.Phase_2_PF+","+avgAll.Phase_3_PF+")"
        // conPower.query(sql, function (err, result) {
        //     console.log("1 record inserted sucessfully")
        // })

    }
});

