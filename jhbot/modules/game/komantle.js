
function getPuzzleNumber () {
    let numPuzzles = 4650;
    const initialDate = new Date('2022-04-01T00:00:00+09:00');
    const puzzleNumber = Math.floor((new Date() - initialDate) / 86400000) % numPuzzles;
    return puzzleNumber;
}

function getKomantle(guess) {
    let puzzleNumber = getPuzzleNumber();
    let res = org.jsoup.Jsoup.connect(`https://semantle-ko.newsjel.ly/guess/` + puzzleNumber + `/` + encodeURI(guess))
        .ignoreContentType(true)
        .ignoreHttpErrors(true)
        .get().text();

        let data = JSON.parse(res);
        if (data.error){
            result = "error";
        } else if (data.guess) {
            result = data;
        } else {
            result = "error";
        }
                
        return(result);
}

function setKomantle(room,komantleRoomList,word) {
    checkRoom = komantleRoomList.filter(e => e.room == room);
    if (checkRoom == 0) {
        let tmpRoom = new Object();
        tmpRoom.room = room;
        tmpRoom.data = [];
        komantleRoomList.push(tmpRoom);
    }
    
    let data = getKomantle(word);
    komantleRoomList[0].data.push(data);
    komantleRoomList[0].data.sort(function(a,b) {
        return b.sim - a.sim ;
    })
    if (komantleRoomList[0].data.length > 10) {
        komantleRoomList[0].data.length = 10;
    }
    
    result = "꼬만틀 게임\n추측한단어\t유사도\t유사도순위";

    for (let i = 0; i < komantleRoomList[0].data.length ; i++) {
        result += "\n" + komantleRoomList[0].data[i].guess + "\t" + (komantleRoomList[0].data[i].sim * 100).toFixed(2) + "\t" + komantleRoomList[0].data[i].rank;
    }
    return result;
}   

module.exports.setKomantle = setKomantle;