
let chat ='';
​FS = FileStream;
let path = "/storage/emulated/0/msgbot/Bots/Rorue/modules/apiKey.json";
apiKeys = JSON.parse(FS.read(path));

const API_KEY= apiKeys.openapi[0].api_key;

function openAiChat(msg) {
    try {
        chat = (chat + '\nYou: ' + msg).trimStart();

        let data = {
            'model' : 'text-davinci-003',
            'prompt': chat + '\nFriend',
            'temperature': 0.5,
            'max_tokens': 1000,
            'top_p': 1,
            'frequency_penalty': 0.5,
            'presence_penalty': 0,
            'stop': ["You:"]

        };
        data = JSON.stringify(data);

        let ans = org.jsoup.Jsoup.connect('https://api.openai.com/v1/completions')
        .header('Content-Type', 'application/json')
        .header('Authorization', 'Bearer ' + API_KEY)
        .requestBody(data)
        .ignoreHttpErrors(true)
        .ignoreContentType(true)
        .post().text();

        ans = JSON.parse(ans);
        ans = ans.choices[0].text.trim()

        //if (chat.split('\n').length > 10){
        //    chat = chat.split('\n').split(-10).join('\n')
        //}
        chat += '\nFriend: ' + ans;
        return ans;
    } catch (e) {
        return e;
    }
}

module.exports.openAiChat=openAiChat;