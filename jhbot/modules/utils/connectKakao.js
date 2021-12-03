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


module.exports.socket=socket;