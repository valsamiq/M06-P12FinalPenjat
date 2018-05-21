window.addEventListener("load", starter, false);
var word;
var count = 0;
var letterSuccess = 0;
var wordArray = [];
var save = [];
function starter() {
    var div = document.getElementById("startBtn");
    //Get word from the php via Function.
    div.addEventListener("click", getWordAJAX, false);
    //Set all images hidden
    document.getElementById("img1").style.visibility = "hidden";
    document.getElementById("img2").style.visibility = "hidden";
    document.getElementById("img3").style.visibility = "hidden";
    document.getElementById("img4").style.visibility = "hidden";
    document.getElementById("img5").style.visibility = "hidden";
    count = 0;
}
function reset() {
    var tmpArray = document.getElementById("showStatus");
    while (tmpArray.firstChild) {
        tmpArray.removeChild(tmpArray.firstChild);
    }
    starter();
}
function sendTry() {
    var actualLetter = document.forms["tryLetter"]["letterField"];
    var letter = actualLetter.value;
    var aux = 0;
    if (letter !== undefined) {
        for (var i in wordArray) {
            if (wordArray[i] === letter) {
                save[i].innerHTML = "<div style='display: inline-block' id='countWordLine' value='" + wordArray[i] + "'> " + wordArray[i] + " &nbsp; </div>";
                aux++;
            }
        }
        letterSuccess = 0;
        for (var i in wordArray) {
            if (document.getElementById("countWord1") === null) {
                letterSuccess++;
            }
        }
        //Each try, put the next image in front of the rest:
        if (aux === 0) {
            count++;
            if (count >= 1) {
                document.getElementById("img1").style.visibility = "visible";
                if (count >= 2) {
                    document.getElementById("img2").style.visibility = "visible";
                    if (count >= 3) {
                        document.getElementById("img3").style.visibility = "visible";
                        if (count >= 4) {
                            document.getElementById("img4").style.visibility = "visible";
                            if (count >= 5) {
                                document.getElementById("img5").style.visibility = "visible";
                                document.getElementById("showStatus").innerHTML = "You failed! (But Hitler is dead, so good job.)";
                            }
                        }
                    }
                }
            }
        }
        if (letterSuccess !== 0) {
            document.getElementById("showStatus").innerHTML = "You Win!";
        }
    }
}
function getWordAJAX() {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", "word.php", true);
    xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-");
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState === 4) {
            if (xmlHttp.status === 200) {
                if (count === 0) {
                    var resposta = xmlHttp.responseText;
                    var respJson = JSON.parse(resposta);
                    word = respJson.Word;
                    for (var i = 0; i <= word.length; i++) {
                        wordArray[i] = word.charAt(i);
                    }
                    for (var i = 0; i < respJson.longitude; i++) {
                        var div = document.createElement("DIV");
                        div.innerHTML = "<div style='display: inline-block' id='countWord1' value='" + wordArray[i] + "'> _ &nbsp; </div>";
                        save[i] = div;
                        document.getElementById("showStatus").appendChild(save[i]);
                    }
                }
            }
        }
    };
    xmlHttp.send(null);
}
