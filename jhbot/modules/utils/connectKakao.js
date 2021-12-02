FS = FileStream;
let path = "/storage/emulated/0/msgbot/Bots/Rorue/modules/utils/socket.json";

const sockets = JSON.parse(FS.read(path));

const socket = new java.net.Socket(sockets.host,sockets.port);
const ins = new java.io.InputStreamReader(socket.getInputStream);


