FS = FileStream;
let path = "/storage/emulated/0/msgbot/Bots/Rorue/modules/utils/socket.json";

const sockets = JSON.parse(FS.read(path));

/*
const socket = new java.net.Socket(sockets.host,sockets.port);
const ins = new java.io.InputStreamReader(socket.getInputStream);
*/

function socket(msg){
    const socket = new java.net.Socket(sockets.host, sockets.port);
    const reader = new java.io.BufferedReader(new java.io.InputStreamReader(socket.getInputStream()));
    //const sender = socket.getOutputStream();
    const pw = new java.io.PrintWriter(socket.getOutputStream());
    pw.print(msg);
    pw.flush();
    let i=0;
    
    let getData = "answer:";

/*
    while((i = reader.read()) !=49 || i != -1){
        
        getData += String.fromCharCode(i);
        Log.d(i);
    }
*/

    
    while((line = reader.readLine())!=null){
        
        if(line == '[*Fin*]') break;

        getData += (line+'\n');
        //Log.d(('test'+ line+ String(line == '') + String(line == null) + String(line == undefined)));

    }
    

    //getData += reader.readLine();
    //getData+=reader;
    

    //pw.close();
    //reader.close();
    //socket.close();
    return getData;
    
    
    
    /*
    const readerThread = new java.lang.Thread({
        run: () => {
            let lines = null;
            let line=null;

            while ((line = reader.readLine()) !== null)   // 받아올 때까지 기다리는 도중에
                lines+=line;
            return lines;
            //return line;
        }
    });
    readerThread.setDaemon(true);
    readerThread.start();
    return (readerThread.run.lines);
    */


}

function socket2(msg){
    const socket = new java.net.Socket(sockets.host, sockets.port);
    const reader = new java.io.BufferedReader(new java.io.InputStreamReader(socket.getInputStream()));
    //const sender = socket.getOutputStream();
    const pw = new java.io.PrintWriter(socket.getOutputStream());
    pw.print(msg);
    pw.flush();
    let i=0;
    let line;
    
    let getData = "answer:";

/*
    while((i = reader.read()) !=49 || i != -1){
        
        getData += String.fromCharCode(i);
        Log.d(i);
    }
*/

    
    if((line = reader.readLine())==null ) return 0;
    

    //getData += reader.readLine();
    //getData+=reader;
    

    //pw.close();
    //reader.close();
    //socket.close();
    return getData;
}
/*
function socket3(msg){
    const socket = new java.net.Socket(sockets.host, sockets.port);
    const reader = new java.io.BufferedReader(new java.io.InputStreamReader(socket.getInputStream()));
    //const sender = socket.getOutputStream();
    const pw = new java.io.PrintWriter(socket.getOutputStream());
    pw.print(msg);
    pw.flush();
    let i=0;
    
    let getData = "answer:";



  
    
    
    
    
    
    const readerThread = new java.lang.Thread({
        //public String result;
        run: () => {
            let lines = null;
            let line=null;

            while ((line = reader.readLine()) !== null)   // 받아올 때까지 기다리는 도중에
                lines+=line;
            return lines;
            //return line;
        }
    });
    readerThread.setDaemon(true);
    readerThread.start();
    return (readerThread);
    

//return getData;
}
*/


function waitForData(socket,reader, callback){

    const pw = new java.io.PrintWriter(socket.getOutputStream());
    
    //pw.print(msg);
    //pw.flush();
    const readerThread = new java.lang.Thread({
       
        run: () => {
            let lines = "";
            let line=null;

            while ((line = reader.readLine()) !== null && line != '[*Fin*]'){   // 받아올 때까지 기다리는 도중에
                //Log.d(line);
                //if(line == '[*Fin*]') break;
                lines+=line+"\n";
            }
            lines=lines.slice(0,-1);
            callback(lines);
            //return line;
        }
    });
    readerThread.setDaemon(true);
    readerThread.start();

}

function sendData(sendmsg,sender,socket){
    const pw = new java.io.PrintWriter(socket.getOutputStream());
    pw.print(sender+" : "+sendmsg);
    pw.flush();
    return;
}



module.exports.socket=socket;
module.exports.socket2=socket2;
//module.exports.socket3=socket3;
module.exports.waitForData=waitForData;
module.exports.sendData=sendData;
