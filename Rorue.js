const scriptName = "Rorue";
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
    else if (command == 'help'){
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
    else if (command .startsWith('번역')){
      let cmd= msg.split(" ")[0];
      let data = msg.replace(cmd+" ","");
      //let language = chatutils.papagoDetectLanguage(data);
      let result = chatutils.papagoTranslate("en", "ko", data);
      replier.reply(result);
    }

  }
  else{
    return;
  }


  
  
}

