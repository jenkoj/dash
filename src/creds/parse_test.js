var fs = require('fs');


try {  
    var data = fs.readFileSync('pass.json', 'utf8');
    data = JSON.parse(data)
    //for mysql
    //username = dataSplit[0].split(":")[1];
    //password = dataSplit[1].split(":")[1];    
    //for 
    console.log(data.esp.key)   
} catch(e) {
    console.log('Error:', e.stack);
}
