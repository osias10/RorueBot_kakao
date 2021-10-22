//const {RIOT_KEY} = require('game/riotKey.json');
FS = FileStream;
let path = "/storage/emulated/0/msgbot/Bots/Rorue/modules/game/riotKey.json";

RIOT_KEYS = JSON.parse(FS.read(path));


function summonerInfo(nickname){
    //let nick = urlencode(nickname);
    let result;
    let res = org.jsoup.Jsoup.connect(`https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/`+java.net.URLEncoder.encode(nickname))
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
            result = profile+"\n"+rank;
        }
        else{
            result = "없는 소환사 정보입니다.";
        }
        

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

function printRank(summonerRank){
    let result;
    let soloRank = summonerRank.filter(obj => obj['queueType'] === 'RANKED_SOLO_5x5');
    if (soloRank !=0){
        result = "[솔로랭크]  "+soloRank[0].tier+" "+ soloRank[0].rank+" " + soloRank[0].leaguePoints+'p';
    }
    else{
        result = "[솔로랭크]  "+"UnRanked";
    }
    let flexRank = summonerRank.filter(obj => obj['queueType'] === 'RANKED_FLEX_SR');
    if (flexRank !=0){
        result += "\n[자유랭크]  "+flexRank[0].tier+" "+ flexRank[0].rank+" " + flexRank[0].leaguePoints+'p';
    }
    else{
        result += "\n[자유랭크]  "+"UnRanked";
    }
    return result;
}



module.exports.summonerInfo = summonerInfo;