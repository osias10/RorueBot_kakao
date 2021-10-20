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



module.exports.papagoTranslate= papagoTranslate;
module.exports.papagoDetectLanguage = papagoDetectLanguage;
    
    
