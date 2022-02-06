
const { KakaoLinkClient } = require('kakaolink');





​FS = FileStream;
let path = "/storage/emulated/0/msgbot/Bots/Rorue/modules/kakaoKey.json";

kakaoKeys = JSON.parse(FS.read(path));

const Kakao = new KakaoLinkClient(kakaoKeys.jskey, kakaoKeys.url1);
Kakao.login(kakaoKeys.email, kakaoKeys.password);

function printLolLink(room,nickname) {

  

  let summoner = getsummonerInfo(nickname);
    if (summoner!=undefined){
        if (summoner.status == "success"){
            Kakao.sendLink(room, {

                template_id: 68425, //템플릿 아이디 5자리
          
                template_args: {
          
                  "summonerImg" : summoner.data.ImgURL,
                  "profileImg" : summoner.data.summonerInfo.profileIcon,
                  "profileName" : "[Lv."+summoner.data.summonerInfo.summonerLevel+"] "+nickname,
                  "soloRank" : summoner.data.summonertier[0].tier,
                  "flexRank" : summoner.data.summonertier[1].tier,
                  "tftRank" : summoner.data.summonertier[2].tier,
                  "champions" : printmost(summoner.data.summonerChampion),
                  "imgPath" : summoner.data.ImgURL.split('i.ibb.co/')[1],
                  "opggPath" : "summoner/userName="+nickname
          
                //카카오링크 태그
          
                }
          
              }, 'custom');
          
        }else if (summoner.status == "ImageError"){
            return("Image server Error");
        }else if (summoner.status == "NotFound"){
            return("없는 소환사 입니다.");
        }

    }else{
        return("서버 에러");
    }

    
  

}
function getsummonerInfo(nickname){
  let res = org.jsoup.Jsoup.connect('http://jaeryurp.duckdns.org:10002/summonerImg?nickname='+nickname)
      .ignoreContentType(true)
      .ignoreHttpErrors(true)
      .get().text();

      let data = JSON.parse(res);
      
  return data;

}
function printmost(summonerChampion){
  most="";
  for (let i=0;i<3;i++){
    most+="[Lv."+summonerChampion[i].championLevel+"] "+summonerChampion[i].championName+"\n";
  }
  return(most);
}

​module.exports.printLolLink=printLolLink ;