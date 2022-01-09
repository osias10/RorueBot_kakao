const scriptName = "Rorue";
FS = FileStream;
/**
 * (string) room
 * (string) sender
 * (boolean) isGroupChat
 * (void) replier.reply(message)
 * (boolean) replier.reply(room, message, hideErrorToast = false) // 전송 성공시 true, 실패시 false 반환
 * (string) imageDB.getProfileBase64()
 * (string) packageName
 */
const chatutils = require('chatutils.js');
const helps = require('helps.js');
const lostark = require('game/lostark.js');
const lolutils = require('game/lolutils.js');
const kalinkutils = require('kalinkutils.js');
const connectKakao = require('utils/connectKakao.js');
const lollink = require('game/lollink.js');
//connectKakao.socket2("test");


let pathS = "/storage/emulated/0/msgbot/Bots/Rorue/modules/utils/socket.json";
/*
const socketsS = JSON.parse(FS.read(pathS));
const socketS = new java.net.Socket(socketsS.host, socketsS.port);
const readerS = new java.io.BufferedReader(new java.io.InputStreamReader(socketS.getInputStream()));




setInterval(function(){
  connectKakao.waitForData(socketS,readerS,(data)=>Api.replyRoom("주녕",data));
},1000);
*/
function response(room, msg, sender, isGroupChat, replier, imageDB, packageName) {
  
  if(msg.startsWith('/')){
    
    let command = msg.substr(1);
    /*
    if(command == 'jaeryu_reload'){
      try{
        Api.off('Rorue');
        if (Api.reload('Rorue') == true){
          Api.on('Rorue');
          replier.reply("reload complete");
        }
        else{
          replier.reply("reload fail");
        }
        
      }
      catch (error){
        replier.reply(error);
      }
    }
    */
    if (command =='안녕'){
      replier.reply("안녕하세요");
    }
    else if (command == 'help' || command == '도움말'){
      let result = helps.help();
      replier.reply(result);
    }
    else if (command.startsWith('검색')){
      let cmd= msg.split(" ")[0];
      let data = msg.replace(cmd+" ","");
      
      replier.reply("네이버 검색 결과: https://m.search.naver.com/search.naver?query=" + data.replace(/ /g, "%20"));
    }
    else if (command =='테스트'){
      replier.reply("테슽중");
    }
    else if (command == '주사위'){
      let dice = Math.floor(Math.random() * 6) +1;
      replier.reply("주사위 결과 : " + dice);
    }
    else if (command.startsWith('번역')){
      let cmd= msg.split(" ")[0];
      let data = msg.replace(cmd+" ","");
      //let language = chatutils.papagoDetectLanguage(data);
      let result = chatutils.papagoTranslate("en", "ko", data);
      replier.reply(result);
    }
    else if (command.startsWith('로아')){
      let cmd= msg.split(" ")[0];
      let data = msg.replace(cmd+" ","");
      let result = lostark.printlostark(data);
      
      replier.reply(result);
    }
    else if (command.startsWith('날씨')){
      let cmd = msg.split(" ")[0];
      let data = msg.replace(cmd + " ", "");
  
      
      let result = chatutils.getGoogleWeather(data);
      if (result == null) replier.reply("날씨 정보 불러오기 실패");
      //else replier.reply(data + "의 날씨 정보입니다\n\n" + result.shift() + "\u200b".repeat(500) + "\n\n" + result.join("\n\n"));
      else replier.reply(result);
    }
    else if (command.startsWith('롤프로필')){
      let cmd = msg.split(" ")[0];
      let data = msg.replace(cmd + " ", "");

      let result = lollink.printLolLink(room,data);
      if (result != undefined){
        replier.reply(result);
      }
      else{
      }
      
    }
    else if (command.startsWith('롤프로필2')){
      let cmd = msg.split(" ")[0];
      let data = msg.replace(cmd + " ", "");

      let result = lolutils.summonerInfo(data);
      if (result != undefined){
        replier.reply(result);
      }
      else{
        replier.reply("없는 소환사 입니다");
      }
      
    }
    else if (command.startsWith('소켓')){
      replier.reply("소켓테스트 시작");
      let answer = connectKakao.socket(msg);
      replier.reply(answer);
    }
    else if (command.startsWith('소')){
      replier.reply("소켓테스트2 시작");
      connectKakao.sendData(msg,sender,socketS);
    }

    else if(command == '카봇테스트'){
      kalinkutils.kalinktest(room);
    }
    //명령어 끝
  }
  else{
    return;
  }


  
  
}

