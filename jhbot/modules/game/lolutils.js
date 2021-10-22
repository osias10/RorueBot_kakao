//const {RIOT_KEY} = require('game/riotKey.json');
FS = FileStream;
let path = "/storage/emulated/0/msgbot/Bots/Rorue/modules/game/riotKey.json";

RIOT_KEYS = JSON.parse(FS.read(path));


function summonerInfo(nickname){
    
    //let nick = urlencode(nickname);
    let result;
    //let res = org.jsoup.Jsoup.connect(`https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/`+java.net.URLEncoder.encode(nickname))
    let res = org.jsoup.Jsoup.connect(`https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/`+encodeURI(nickname))
        .header("X-Riot-Token",RIOT_KEYS.RIOT_KEY)
        .ignoreContentType(true)
        .ignoreHttpErrors(true)
        .get().text();

        let data = JSON.parse(res);
        if (data.id){
            let rankData = summonerRankInfo(data.id);
            let rank = printRank(rankData);
            let profile = "롤 프로필\n\n"+nickname+"\nLevel: "+data.summonerLevel;
            //return("롤 프로필\n\n"+nickname+"\nLevel: "+data.summonerLevel);
            
            let tft= printTftRank(nickname);
            result = profile+"\n"+rank+tft;
        }
        else{
            result = "없는 소환사 정보입니다.";
        }
        
        //return printTftRank(nickname);
        
        return(result);

}

function summonerRankInfo(id){
    let res = org.jsoup.Jsoup.connect('https://kr.api.riotgames.com/lol/league/v4/entries/by-summoner/'+id)
        .header("X-Riot-Token",RIOT_KEYS.RIOT_KEY)
        .ignoreContentType(true)
        .ignoreHttpErrors(true)
        .get().text();

        let data = JSON.parse(res);
        
    return data;

}

function getSummonerInfoTft(nickname){

    let result;
    let res = org.jsoup.Jsoup.connect(`https://kr.api.riotgames.com/tft/summoner/v1/summoners/by-name/`+encodeURI(nickname))
        .header("X-Riot-Token",RIOT_KEYS.RIOT_TFT_KEY)
        .ignoreContentType(true)
        .ignoreHttpErrors(true)
        .get().text();

        let data = JSON.parse(res);
        return data.id;
        if (data.id){
            result = (data.id);
            
        }
        else{
            result = "없는 소환사 정보입니다.";
        }
        

        return(result);
}

function getsummonerRankInfoTft(id){
    let res = org.jsoup.Jsoup.connect('https://kr.api.riotgames.com/tft/league/v1/entries/by-summoner/'+id)
        .header("X-Riot-Token",RIOT_KEYS.RIOT_TFT_KEY)
        .ignoreContentType(true)
        .ignoreHttpErrors(true)
        .get().text();

        let data = JSON.parse(res);
        
    return data;

}



function printRank(summonerRank){
    let result;
    
    let soloRank = summonerRank.filter(obj => obj['queueType'] === 'RANKED_SOLO_5x5');

    //return ((soloRank[0].wins)+(soloRank[0].losses));

    if (soloRank !=0){
        result = "[솔로랭크]  "+soloRank[0].tier+" "+ soloRank[0].rank+" " + soloRank[0].leaguePoints+'p'+printGameCount(soloRank);
    }
    else{
        result = "[솔로랭크]  "+"UnRanked";
    }
    let flexRank = summonerRank.filter(obj => obj['queueType'] === 'RANKED_FLEX_SR');
    if (flexRank !=0){
        result += "\n[자유랭크]  "+flexRank[0].tier+" "+ flexRank[0].rank+" " + flexRank[0].leaguePoints+'p'+printGameCount(flexRank);
    }
    else{
        result += "\n[자유랭크]  "+"UnRanked";
    }
    return result;
}
function printGameCount(Rank){
   return '\n\t'+((Rank[0].wins)+(Rank[0].losses))+'전 '+Rank[0].wins+'승 '+Rank[0].losses+'패 '+((Rank[0].wins/(Rank[0].wins+Rank[0].losses)*100).toFixed())+'%';
}

function printTftRank(nickname){
    let result;
    let tftRank = getsummonerRankInfoTft(getSummonerInfoTft(nickname));
    if (tftRank !=0){
        result += "\n[TFT랭크]  "+tftRank[0].tier+" "+ tftRank[0].rank+" " + tftRank[0].leaguePoints+'p'+printGameCount(tftRank);
    }
    else{
        result += "\n[TFT랭크]]  "+"UnRanked";
    }
    return result;
}




module.exports.summonerInfo = summonerInfo;