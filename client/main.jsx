import { Meteor } from 'meteor/meteor';

import './main.html';

Meteor.subscribe('questions');
Meteor.subscribe('channels');
Meteor.subscribe('users');
Meteor.subscribe('teams');
Meteor.subscribe('currentQuestion');

Meteor.startup(() => {
    QuizQuestions = new Mongo.Collection("quiz");
    Channels = new Mongo.Collection("Channels");
    Teams = new Mongo.Collection("Teams");
    QuestionsMeta = new Mongo.Collection("currentQuestion");
});

Template.antwoord.helpers({
    'quizSize': function () {
        return QuizQuestions.find().count();
    },
    'questionCount': function () {
        if (QuestionsMeta.findOne() != undefined) {
            return QuestionsMeta.findOne().currentNumber;
        }
    },
    'answer1': function () {
        if (QuestionsMeta.findOne() != undefined) {
            var currentQuestionId = QuestionsMeta.findOne().current;
            var antwoordNummer = QuestionsMeta.findOne().orderArray[0];
            return QuizQuestions.findOne({"_id": currentQuestionId}).answers[antwoordNummer].answer;
        }
    },
    'answer2': function () {
        if (QuestionsMeta.findOne() != undefined) {
            var currentQuestionId = QuestionsMeta.findOne().current;
            var antwoordNummer = QuestionsMeta.findOne().orderArray[1];
            return QuizQuestions.findOne({"_id": currentQuestionId}).answers[antwoordNummer].answer;
        }
    },
    'answer3': function () {
        if (QuestionsMeta.findOne() != undefined) {
            var currentQuestionId = QuestionsMeta.findOne().current;
            var antwoordNummer = QuestionsMeta.findOne().orderArray[2];
            return QuizQuestions.findOne({"_id": currentQuestionId}).answers[antwoordNummer].answer;
        }
    },
    'answer4': function () {
        if (QuestionsMeta.findOne() != undefined) {
            var currentQuestionId = QuestionsMeta.findOne().current;
            var antwoordNummer = QuestionsMeta.findOne().orderArray[3];
            return QuizQuestions.findOne({"_id": currentQuestionId}).answers[antwoordNummer].answer;
        }
    },
    'timeLeft': function () {
        if (QuestionsMeta.findOne() != undefined) {
            return QuestionsMeta.findOne().timer;
        }
    },
    'myScore': function () {
        if (Meteor.user().profile.score == undefined) {
            return 0;
        } else {
            return Meteor.user().profile.score;
        }
    }
});

Template.vragen.helpers({
    team: function () {
        if(Meteor.user() != undefined) {
            ppp = Meteor.user().profile.kamercode;
            return Teams.find({room: ppp});

        }
    },
    'quizSize': function () {
        return QuizQuestions.find().count();
    },
    'questionCount': function () {
        if (QuestionsMeta.findOne() != undefined) {
            return QuestionsMeta.findOne().currentNumber;
        }
    },
    'vraag': function () {
        if (QuestionsMeta.findOne() != undefined) {
            var currentQuestionId = QuestionsMeta.findOne().current;
            if (currentQuestionId != null) {
                return QuizQuestions.findOne({'_id': currentQuestionId}).question;
            }
        }
    },
    'timeLeft': function () {
        if (QuestionsMeta.findOne() != undefined) {
            return QuestionsMeta.findOne().timer;
        }
    },
    'timeChecker': function () {
        if (QuestionsMeta.findOne() != undefined) {
            if (QuestionsMeta.findOne().timer != "Tijd is om") {
                return "It's all good";
            } else {
                return "Oh mah damn!";
            }
        }
    },
    'myScore': function () {
        if (Meteor.user().profile.score == undefined) {
            return 0;
        } else {
            return Meteor.user().profile.score;
        }
    },
    'questionImage': function () {
        if (QuestionsMeta.findOne() != undefined) {
            var currentQuestionId = QuestionsMeta.findOne().current;
            if (currentQuestionId != null) {
                return QuizQuestions.findOne({'_id': currentQuestionId}).picture;
            }
        }
    },
    sortedPlayers: function () {
        return Meteor.users.find({}, {
            sort: { "profile.score": -1 }
        }).fetch();
    }
});

function startTimer(duration) {
    console.log('Timer started at QuizMaster Client!');

    var timer = duration, minutes, seconds;
    var counter = setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        if (minutes == 1) {
            seconds = 60;
        }

        var metaId = QuestionsMeta.findOne()._id;
        QuestionsMeta.update(metaId, {$set: {"timer": seconds}});

        if (--timer < 0) {
            clearInterval(counter);
        }
    }, 1000);
}

Template.vragen.events({
    'click #leaderboard-title': function(event){
        event.preventDefault();
        Meteor.call('get question');
        startTimer(40);
    }
});

Template.answers.events({
    'click #next-question': function(event){
        event.preventDefault();
        if (QuestionsMeta.findOne().currentNumber == QuizQuestions.find().count()) {
            Router.go("winnaar");
        } else {
            Router.go("wachtscherm");
            Meteor.call('get question');
            startTimer(40);
        }
    }
});

Template.answers.helpers({
    'quizAnswer': function () {
        if (QuestionsMeta.findOne() != undefined) {
            var currentQuestionId = QuestionsMeta.findOne().current;
            return QuizQuestions.findOne({'_id': currentQuestionId}).answers[3].uitleg;
        }
    },
    'quizTitel': function () {
        if (QuestionsMeta.findOne() != undefined) {
            var currentQuestionId = QuestionsMeta.findOne().current;
            return QuizQuestions.findOne({'_id': currentQuestionId}).answers[3].answer;
        }
    }
});

Template.child.events({
    'click button': function(e, tpl){
        tpl.data.onClick(e);
    }
});

Template.parent.helpers({
    doSomeAction(){
        return function(){
            document.getElementById('login-module').className = "hidden";
            document.getElementById('register-module').className = "show";
        }
    }
});

Template.childreg.events({
    'click button': function(e, tpl){
        tpl.data.onClick(e);
    }
});

Template.parentreg.helpers({
    doSomeAction(){
        return function(){
            document.getElementById('login-module').className = "show";
            document.getElementById('register-module').className = "hidden"
        }
    }
});

Template.roomcode.onRendered(function() {
    // console.log("LALA");
    // $('input').bind('this', function() {
    //     if ('input'.value.length >= $(this).attr('maxlength')) {
    //         console.log("first");
    //         $('input').next().select();
    //     }
    //     if ('input'.value.length == 0) {
    //         console.log("second");
    //         $('input').prev().select();
    //     }
    // });
});

var code1;
var code2;
var code3;
var code4;

var codeX;

codeX = Number;
name = Number;
get_placement_id = function(doc) { return doc.name; };

// Channels = new Mongo.Collection("Channels");

Template.roomcode.events({
    'submit form': function(event){
        event.preventDefault();
        code1 = document.getElementById('code1').value;
        code2 = document.getElementById('code2').value;
        code3 = document.getElementById('code3').value;
        code4 = document.getElementById('code4').value;
        codeX = code1 + code2 + code3 + code4;
        codeX = parseInt(codeX);
        console.log(codeX);
        findCodeX = Channels.find({kamercode: codeX}).count();

        if (findCodeX >= 1){
            gebruiker = Meteor.userId(); //het id van de gebruiker die is ingelogd
            kfcx = Channels.findOne({kamercode: codeX}, {fields: {name: 1, kamercode: 1, _id: 0}}); //find statement met als resultaat een object uit de Channels
            Meteor.users.update(gebruiker, {$set: {"profile": kfcx}});  //importeren van de gevonden channelgegevens
            Router.go("lobby");
        } else {
            document.getElementById('errorMsg').innerHTML = "<h2 style='text-align: center; color: #FFFFFF; font-size: 15px; margin-top: -16%;'>Kamer niet gevonden! <br>Probeer het opnieuws</h2>";
        }

        Meteor.users.update(
            { _id: this._id },
            {$set:
                { room: codeX }
            },
            // Meteor.users.update(gebruiker, {$set: {"profile.kamercode": kamercijfer}});
        );
    }
});



function counter() {
    return Teams.find().count() + 1;
}
ppp = parseInt;

Template.lobbymobile.helpers({
    team: function () {
        if(Meteor.user() != undefined) {
            ppp = Meteor.user().profile.kamercode;
            return Teams.find({room: ppp});

        }
    },
    'memberCount': function () {
        if (this.powerupmaster != "" && this.questionmaster != "") {
            return "2";
        } else if (this.powerupmaster != ""  || this.questionmaster != "") {
            return "1";
        } else {
            return "0";
        }
    }
});

Template.lobbymobile.events({
    'click #startquiz': function(event){
        event.preventDefault();
        console.log("start quiz");
        Router.go("vragen");
    },
    'submit #createTeam': function(event) {
        event.preventDefault();
        var name = document.getElementById('name').value;
        var user = Meteor.user().emails[0].address;
        // var visibility = document.getElementById('visible').checked;
        var el = document.getElementById("role");
        var selectedValue = el.options[el.selectedIndex].value;
        var teamCode = Meteor.user().profile.kamercode; // Gets teamname
        console.log(teamCode);
        if (selectedValue == "Questionmaster") {
            Teams.insert({
                name: name,
                questionmaster: user,
                number: counter(),
                // visible: visibility,
                score: 0,
                position: 0,
                room: teamCode
            });
        } else if (selectedValue == "Powerupmaster") {
            Teams.insert({
                name: name,
                powerupmaster: user,
                number: counter(),
                // visible: visibility,
                score: 0,
                position: 0,
                room: teamCode
            });
        }
    },
    'click #joinQM': function() {
        event.preventDefault();
        var user = Meteor.user().emails[0].address; // Gets user data
        var teamName = JSON.stringify(Teams.findOne({_id: this._id}, {fields: {name: 1, _id: 0}})).slice(9,-2); // Gets teamname
        Meteor.users.update(Meteor.userId(), {$set: {"profile.team": teamName }}); // add teamname to user data
        var teamNaam = Meteor.users.findOne(Meteor.userId()).profile.team;
        var i = Teams.find({name: teamNaam}).fetch()[0].number;

        // Meteor.users.update({_id: Meteor.userId()}, {$set: {role: "questionmaster"}});

        if (Teams.find({}).fetch()[i-1].powerupmaster == user){
            Teams.update({_id: this._id}, {$set: {powerupmaster: ""}});
        };
        Teams.update({_id: this._id}, {$set: {questionmaster: user}}); // add user to the team
    },
    'click #joinPM': function() {
        event.preventDefault();
        var user = Meteor.user().emails[0].address; // Gets user data
        var teamName = JSON.stringify(Teams.findOne({_id: this._id}, {fields: {name: 1, _id: 0}})).slice(9, -2); // Gets teamname
        Meteor.users.update(Meteor.userId(), {$set: {"profile.team": teamName}}); // add teamname to user data
        var teamNaam = Meteor.users.findOne(Meteor.userId()).profile.team;
        var i = Teams.find({name: teamNaam}).fetch()[0].number;
        if (Teams.find({}).fetch()[i - 1].questionmaster == user) {
            Teams.update({_id: this._id}, {$set: {questionmaster: ""}});
        }
        Teams.update({_id: this._id}, {$set: {powerupmaster: user}}) // add user to the team
    }

    });



Template.lobbydesktop.helpers({
    roomcode: function() {
        if(Meteor.user() != undefined) {
            return Meteor.user().profile.kamercode;
        }
    },
    team: function () {
        if(Meteor.user() != undefined) {
            ppp = Meteor.user().profile.kamercode;
            return Teams.find({room: ppp});

        }
    },
    TeamsCount: function () {
        if(Meteor.user() != undefined) {
            ppp = Meteor.user().profile.kamercode;
            return Teams.find({room: ppp}).count();
        }
    },
    'memberCount': function () {
        if (this.powerupmaster != "" && this.questionmaster != "") {
            return "2";
        } else if (this.powerupmaster != ""  || this.questionmaster != "") {
            return "1";
        } else {
            return "0";
        }
    }
});

Template.lobbydesktop.events({
    'click #startquiz': function(event){
        event.preventDefault();
        Meteor.call('reset quiz');
        Router.go("wachtscherm");
        Meteor.call('get question');
        startTimer(40);
    }
});

Template.wachtscherm.helpers({
    'afteller': function () {
        if (QuestionsMeta.findOne() != undefined) {
            return QuestionsMeta.findOne().afteller;
        }
    },
    'startOrNext': function () {
        if (QuestionsMeta.findOne() != undefined) {
            if (QuestionsMeta.findOne().currentNumber == 1) {
                return "PubQuiz begint over";
            } else {
                return "Volgende vraag over";
            }
        }
    }
});

Template.waitscreen.helpers({
    'afteller': function () {
        if (QuestionsMeta.findOne() != undefined) {
            return QuestionsMeta.findOne().afteller + " seconden"
        }
    },
    'waitStatus': function () {
        if (QuestionsMeta.findOne() != undefined) {
            if (QuestionsMeta.findOne().currentNumber == 1) {
                return "PubQuiz begint over";
            } else {
                return "Volgende vraag over";
            }
        }
    }
});