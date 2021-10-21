//const {RIOT_KEY} = require('game/riotKey.json');
FS = FileStream;
let path = "/storage/emulated/0/msgbot/Bots/Rorue/modules/game/riotKey.json";

RIOT_KEYS = JSON.parse(FS.read(path));


function summonerInfo(nickname){
    //let nick = urlencode(nickname);
    let res = org.jsoup.Jsoup.connect(`https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/`+java.net.URLEncoder.encode(nickname))
        .header("X-Riot-Token",RIOT_KEYS.RIOT_KEY)
        .ignoreContentType(true)
        .ignoreHttpErrors(true)
        .get().text();

        let data = JSON.parse(res);
        return("롤 프로필\n\n"+nickname+"\nLevel: "+data.summonerLevel);
        //return(nickname);
}

module.exports.summonerInfo = summonerInfo;