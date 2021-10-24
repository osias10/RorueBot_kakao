const { KakaoLinkClient } = require('kakaolink');





​FS = FileStream;
let path = "/storage/emulated/0/msgbot/Bots/Rorue/modules/kakaoKey.json";

kakaoKeys = JSON.parse(FS.read(path));

const Kakao = new KakaoLinkClient(kakaoKeys.jskey, kakaoKeys.url1);
Kakao.login(kakaoKeys.email, kakaoKeys.password);

function kalinktest(room) {

  

    Kakao.sendLink(room, {

      template_id: 64069, //템플릿 아이디 5자리

      template_args: {

        "THU" : 'https://opgg-static.akamaized.net/logo/20211017130952.a291bfe6af7e40b896548c57112f7564.png',
        "TITLE" : "타이틀",
        "SUBTITLE" : "서브주제"
        

      //카카오링크 태그

      }

    }, 'custom');

  

}

​module.exports.kalinktest=kalinktest ;