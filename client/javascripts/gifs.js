var winnerGifs = ["../images/gifs/success/obama.gif", "../images/gifs/success/kim-jung-un.gif", "../images/gifs/success/pleased_king.gif",
                    "../images/gifs/success/bb-8.gif", "../images/gifs/success/joker.gif", "../images/gifs/success/claire.gif",
                    "../images/gifs/success/lizz-lemon.gif"];
var loserGifs = ["../images/gifs/loser/ramsay.gif", "../images/gifs/loser/mourinho.gif", "../images/gifs/loser/taylor.gif",
                "../images/gifs/loser/trump.gif", "../images/gifs/loser/dumbledore.gif", "../images/gifs/loser/putin.gif"];

var gifNr;

function printGifSucces() {
    gifNr = 0;
    gifNr = Math.floor(Math.random() * 7);
    if (gifNr == 0) {
        angular.element(document).find('#vraag-uitslag-mob').css("background", "url(" + winnerGifs[0] + ")no-repeat right");
        angular.element(document).find('#vraag-uitslag-mob').css("background-position", "0");
    } else if (gifNr == 1) {
        angular.element(document).find('#vraag-uitslag-mob').css("background", "url(" + winnerGifs[1] + ")no-repeat right");
        angular.element(document).find('#vraag-uitslag-mob').css("background-position-x", "-180px");
    } else if (gifNr == 2) {
        angular.element(document).find('#vraag-uitslag-mob').css("background", "url(" + winnerGifs[2] + ")no-repeat left");
        angular.element(document).find('#vraag-uitslag-mob').css("background-position-x", "-160px");
    } else if (gifNr == 3) {
         angular.element(document).find('#vraag-uitslag-mob').css("background", "url(" + winnerGifs[3] + ")no-repeat left");
         angular.element(document).find('#vraag-uitslag-mob').css("background-position-x", "-750px");
    } else if (gifNr == 4) {
        angular.element(document).find('#vraag-uitslag-mob').css("background", "url(" + winnerGifs[4] + ")no-repeat left");
        angular.element(document).find('#vraag-uitslag-mob').css("background-position-x", "-490px");
    } else if (gifNr == 5) {
        angular.element(document).find('#vraag-uitslag-mob').css("background", "url(" + winnerGifs[5] + ")no-repeat left");
        angular.element(document).find('#vraag-uitslag-mob').css("background-position-x", "-550px");
    } else if (gifNr == 6) {
        angular.element(document).find('#vraag-uitslag-mob').css("background", "url(" + winnerGifs[6] + ")no-repeat left");
        angular.element(document).find('#vraag-uitslag-mob').css("background-position-x", "-180px");
    }
}

function printGifLoser() {
    gifNr = 0;
    gifNr = Math.floor(Math.random() * 6);
    if (gifNr == 0) {
        angular.element(document).find('#vraag-uitslag-fout-mob').css("background", "url(" + loserGifs[0] + ")no-repeat right");
        angular.element(document).find('#vraag-uitslag-fout-mob').css("background-position-x", "-180px");
        angular.element(document).find('#mijnscore-mob').css("background", "url(" + loserGifs[0] + ")no-repeat right");
        angular.element(document).find('#mijnscore-mob').css("background-position-x", "-180px");
    } else if (gifNr == 1) {
        angular.element(document).find('#vraag-uitslag-fout-mob').css("background", "url(" + loserGifs[1] + ")no-repeat right");
        angular.element(document).find('#vraag-uitslag-fout-mob').css("background-position-x", "-75px");
        angular.element(document).find('#mijnscore-mob').css("background", "url(" + loserGifs[1] + ")no-repeat right");
        angular.element(document).find('#mijnscore-mob').css("background-position-x", "-75px");
    } else if (gifNr == 2) {
        angular.element(document).find('#vraag-uitslag-fout-mob').css("background", "url(" + loserGifs[2] + ")no-repeat right");
        angular.element(document).find('#vraag-uitslag-fout-mob').css("background-position-x", "-340px");
        angular.element(document).find('#mijnscore-mob').css("background", "url(" + loserGifs[2] + ")no-repeat right");
        angular.element(document).find('#mijnscore-mob').css("background-position-x", "-340px");
    } else if (gifNr == 3) {
        angular.element(document).find('#vraag-uitslag-fout-mob').css("background", "url(" + loserGifs[3] + ")no-repeat right");
        angular.element(document).find('#vraag-uitslag-fout-mob').css("background-position-x", "-350px");
        angular.element(document).find('#mijnscore-mob').css("background", "url(" + loserGifs[3] + ")no-repeat right");
        angular.element(document).find('#mijnscore-mob').css("background-position-x", "-350px");
    } else if (gifNr == 4) {
        angular.element(document).find('#vraag-uitslag-fout-mob').css("background", "url(" + loserGifs[4] + ")no-repeat right");
        angular.element(document).find('#vraag-uitslag-fout-mob').css("background-position-x", "-650px");
        angular.element(document).find('#mijnscore-mob').css("background", "url(" + loserGifs[4] + ")no-repeat right");
        angular.element(document).find('#mijnscore-mob').css("background-position-x", "-650px");
    } else if (gifNr == 5) {
        angular.element(document).find('#vraag-uitslag-fout-mob').css("background", "url(" + loserGifs[5] + ")no-repeat right");
        angular.element(document).find('#vraag-uitslag-fout-mob').css("background-position-x", "-440px");
        angular.element(document).find('#mijnscore-mob').css("background", "url(" + loserGifs[5] + ")no-repeat right");
        angular.element(document).find('#mijnscore-mob').css("background-position-x", "-440px");
    }
}
