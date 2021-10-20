var pattern1 = /[0-9]/; //숫자
var pattern2 = /[a-zA-Z]/; //영어
var pattern3 = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/; //한글

function papagoTranslate(lang1, lang2, value){

    if(pattern3.test(value)){
        lang1='ko';
        lang2='en';
    }
    else if (pattern2.test(value)){
        lang1 = 'en';
        lang2 = 'ko';
    }
    else{
        lang1 = papagoDetectLanguage(value);
        lang2 = 'ko';
    }
    
    let res = org.jsoup.Jsoup.connect("https://openapi.naver.com/v1/papago/n2mt")
        .header("X-Naver-Client-Id","3FmnEO6RRq4uSQ_Z0ufV")
        .header("X-Naver-Client-Secret","GXCm_KOwoc")
        .data("source", lang1)
        .data("target", lang2)
        .data("text", value)
        .ignoreContentType(true)
        .ignoreHttpErrors(true)
        .post().text();

        let data = JSON.parse(res);


        return data.message.result.translatedText;
}

function papagoDetectLanguage(content){
    let res = org.jsoup.Jsoup.connect("https://openapi.naver.com/v1/papago/detectLangs")
        .header("X-Naver-Client-Id","uUiG_W3DEY65F8nL87RE")
        .header("X-Naver-Client-Secret","1p_wNysq2P")
        .data("query", content)
        .ignoreContentType(true)
        .ignoreHttpErrors(true)
        .post().text();

        let data = JSON.parse(res);
        
        return data.langCode;
}

function getNaverWeather(loc) {
    try {
        var url = Utils.parse("https://m.search.naver.com/search.naver?query=" + loc.replace(/ /g, "+") + "+날씨")
            .select("a.csm_more").attr("href");
        var data = Utils.parse(url).select("ul.week_list > li");
        var result = [];
        var days = ["오늘", "내일", "모래", "글피"];
        for (var n = 0; n < days.length; n++) {
            var info = data.get(n).select("span");
            result[n] = "[" + days[n] + " 날씨]\n";
            result[n] += "상태 : " + info.get(2).attr("data-wetr-txt") + " -> ";
            result[n] += info.get(7).attr("data-wetr-txt") + "\n";
            result[n] += "강수확률 : " + info.get(4).ownText() + " -> ";
            result[n] += info.get(9).ownText() + "\n";
            var tmp = data.get(n).select("strong.temperature").select("span");
            tmp = (tmp.get(0).ownText() + " ~ " + tmp.get(3).ownText()).replace(/°/g, "℃");
            result[n] += "온도 : " + tmp;
            return result;
        }
    } catch (e) {
        Log.error(loc + "날씨 정보 뜯어오기 실패\n" + e);
        return null;
    }
}



module.exports.papagoTranslate= papagoTranslate;
module.exports.papagoDetectLanguage = papagoDetectLanguage;
module.exports.getNaverWeather = getNaverWeather;
    
    
