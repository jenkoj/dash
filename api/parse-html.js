//get current switch state 
const exec = require("child_process").exec;
let switchState;
ip = "10.10.10.104";

exec("curl " + ip, (error, stdout, stderr) => {
        try {

            //parse html
            let st = stdout.split('<!--#state-->')[1].split("</h1>")[0];
            
            if (st == "on") switchState = 1;
            else switchState = 0;

        } catch(typeError){
            switchState = 0;
            console.log("error while getting switch state")
        }
})
