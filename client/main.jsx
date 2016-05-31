import { Meteor } from 'meteor/meteor';

import './main.html';

import {test} from '../db/main.js';

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

Template.mobcode.events({
    'click #meteortest': function test(event){
        event.preventDefault();
        console.log("You clicked a #player element");
        Meteor.call('hallo');
        // document.getElementById('start-container').innerHTML = "<h2>TEST</h2>"
    }
});

Template.vragen.helpers({
    'quizSize': function () {
        return QuizQuestions.find().count();
    },
    'vraag': function () {
        var currentQuestionId = QuestionsMeta.findOne().current;
        return QuizQuestions.find({"_id": currentQuestionId}).fetch()[0].question;
    }
});

Template.vragen.events({
    'click #leaderboard-title': function(event){
        event.preventDefault();
        Meteor.call('get question');
    },
    'click #reload': function () {
        Meteor.call('restart quiz');
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
        findCodeX = Channels.find({code: codeX}).count();

        if (findCodeX => 1){
            console.log("Room exist.");

            gebruiker = Meteor.userId(); //het id van de gebruiker die is ingelogd
            kfcx = Channels.findOne({code: codeX}, {fields: {name: 1, code: 1, _id: 0}}); //find statement met als resultaat een object uit de Channels
            Meteor.users.update(gebruiker, {$set: {"profile": kfcx}});  //importeren van de gevonden channelgegevens
            Router.go("lobby");
            
        } else {
            console.log("Room doesn't exist.");
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

Template.lobby.helpers({
    team: function () {
        return Teams.find();
    },
    TeamsCount: function () {
        return Teams.find().count();
    },
    function(){
        if (isMobile = true) {
            document.getElementById('createTeam').style.display = "none";
        } else {
            document.getElementById('createTeam').style.display = "block";
        }
    }
});

Template.lobby.events({
    'submit #createTeam': function(event) {
        event.preventDefault();
        var name = document.getElementById('name').value;
        var user = Meteor.user().emails[0].address;
        var visibility = document.getElementById('visible').checked;
        var el = document.getElementById("role");
        var selectedValue = el.options[el.selectedIndex].value;
        if (selectedValue == "Questionmaster") {
            Teams.insert({
                name: name,
                questionmaster: user,
                number: counter(),
                visible: visibility,
                score: 0,
                position: 0
            });
        } else if (selectedValue == "Powerupmaster") {
            Teams.insert({
                name: name,
                powerupmaster: user,
                number: counter(),
                visible: visibility,
                score: 0,
                position: 0
            });
        } else if (selectedValue == "Player Three") {
            Teams.insert({
                name: name,
                playerthree: user,
                number: counter(),
                visible: visibility,
                score: 0,
                position: 0
            });
        } else if (selectedValue == "Player Four") {
            Teams.insert({
                name: name,
                playerfour: user,
                number: counter(),
                visible: visibility,
                score: 0,
                position: 0
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
        if (Teams.find({}).fetch()[i-1].powerupmaster == user){
            Teams.update({_id: this._id}, {$set: {powerupmaster: ""}});
        } else{};

        if (Teams.find({}).fetch()[i-1].playerthree == user){
            Teams.update({_id: this._id}, {$set: {playerthree: ""}});
        } else{};

        if (Teams.find({}).fetch()[i-1].playerfour == user){
            Teams.update({_id: this._id}, {$set: {playerfour: ""}});
        } else{};

        Teams.update({_id: this._id}, {$set: {questionmaster: user}}); // add user to the team
    },
    'click #joinPM': function() {
        event.preventDefault();
        var user = Meteor.user().emails[0].address; // Gets user data
        var teamName = JSON.stringify(Teams.findOne({_id: this._id}, {fields: {name: 1, _id: 0}})).slice(9,-2); // Gets teamname
        Meteor.users.update(Meteor.userId(), {$set: {"profile.team": teamName }}); // add teamname to user data
        var teamNaam = Meteor.users.findOne(Meteor.userId()).profile.team;
        var i = Teams.find({name: teamNaam}).fetch()[0].number;
        if (Teams.find({}).fetch()[i-1].questionmaster == user){
            Teams.update({_id: this._id}, {$set: {questionmaster: ""}});
        }
        if (Teams.find({}).fetch()[i-1].playerthree == user){
            Teams.update({_id: this._id}, {$set: {playerthree: ""}});
        }
        if (Teams.find({}).fetch()[i-1].playerfour == user){
            Teams.update({_id: this._id}, {$set: {playerfour: ""}});
        }
        Teams.update({_id: this._id}, {$set: {powerupmaster: user}}) // add user to the team
    },
    'click #joinP3': function() {
        event.preventDefault();
        var user = Meteor.user().emails[0].address; // Gets user data
        var teamName = JSON.stringify(Teams.findOne({_id: this._id}, {fields: {name: 1, _id: 0}})).slice(9,-2); // Gets teamname
        Meteor.users.update(Meteor.userId(), {$set: {"profile.team": teamName }}); // add teamname to user data
        var teamNaam = Meteor.users.findOne(Meteor.userId()).profile.team;
        var i = Teams.find({name: teamNaam}).fetch()[0].number;
        if (Teams.find({}).fetch()[i-1].questionmaster == user){
            Teams.update({_id: this._id}, {$set: {questionmaster: ""}});
        }
        if (Teams.find({}).fetch()[i-1].powerupmaster == user){
            Teams.update({_id: this._id}, {$set: {powerupmaster: ""}});
        }
        if (Teams.find({}).fetch()[i-1].playerfour == user){
            Teams.update({_id: this._id}, {$set: {playerfour: ""}});
        }
        Teams.update({_id: this._id}, {$set: {playerthree: user}}) // add user to the team
    },
    'click #joinP4': function() {
        event.preventDefault();
        var user = Meteor.user().emails[0].address; // Gets user data
        var teamName = JSON.stringify(Teams.findOne({_id: this._id}, {fields: {name: 1, _id: 0}})).slice(9,-2); // Gets teamname
        Meteor.users.update(Meteor.userId(), {$set: {"profile.team": teamName }}); // add teamname to user data
        var teamNaam = Meteor.users.findOne(Meteor.userId()).profile.team;
        var i = Teams.find({name: teamNaam}).fetch()[0].number;
        if (Teams.find({}).fetch()[i-1].questionmaster == user){
            Teams.update({_id: this._id}, {$set: {questionmaster: ""}});
        }
        if (Teams.find({}).fetch()[i-1].powerupmaster == user){
            Teams.update({_id: this._id}, {$set: {powerupmaster: ""}});
        }
        if (Teams.find({}).fetch()[i-1].playerthree == user){
            Teams.update({_id: this._id}, {$set: {playerthree: ""}});
        }
        Teams.update({_id: this._id}, {$set: {playerfour: user}}) // add user to the team
    }

    });

// /*
// Code to change*/
//
//
// var emptyslots = 0;
// var currentPlayers;
//
// if(powerupmaster == ""){
//     emptyslots += 1
// }
//
// if(questionmaster == ""){
//     emptyslots += 1
// }
//
// if(playerthree == ""){
//     emptyslots += 1
// }
//
// if(playerfour == ""){
//     emptyslots += 1
// }
//
// currentPlayers = 4 - emptyslots